import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";
import { getAirQuality } from "../services/airQualityApi";
import { getWeather } from "../services/weatherApi";
import { useWeatherStore } from "../stores/weatherStore";

export default function useWeather() {
  const weather = useWeatherStore((s) => s.weather);
  const setWeather = useWeatherStore((s) => s.setWeather);

  const coords = useWeatherStore((s) => s.coords);
  const setCoords = useWeatherStore((s) => s.setCoords);

  const locationName = useWeatherStore((s) => s.locationName);
  const setLocationName = useWeatherStore((s) => s.setLocationName);

  const [pm25, setPm25] = useState<number | null>(null);
  const [loading, setLoading] = useState(!weather);

  const lastFetchRef = useRef<number | null>(null);

  useEffect(() => {
    if (!weather) loadWeather();
  }, []);

  const getCoords = async () => {
    if (coords) return coords;

    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      const fallback = { lat: 21.0285, lon: 105.8542 };
      setCoords(fallback);
      setLocationName("Hà Nội");
      return fallback;
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Low,
    });

    const lat = location.coords.latitude;
    const lon = location.coords.longitude;

    const result = { lat, lon };

    setCoords(result);

    Location.reverseGeocodeAsync({
      latitude: lat,
      longitude: lon,
    }).then((reverse) => {
      if (reverse.length > 0) {
        const place = reverse[0];

        const name =
          place.subregion && place.region
            ? `${place.subregion}, ${place.region}`
            : place.region || "Việt Nam";

        setLocationName(name);
      }
    });

    return result;
  };

  const loadWeather = async (force = false) => {
    const now = Date.now();

    if (
      !force &&
      lastFetchRef.current &&
      now - lastFetchRef.current < 10 * 60 * 1000
    ) {
      setLoading(false);
      return;
    }

    const location = await getCoords();
    const { lat, lon } = location;

    const [weatherData, air] = await Promise.all([
      getWeather(lat, lon),
      getAirQuality(lat, lon),
    ]);

    setWeather(weatherData);
    setPm25(air);

    lastFetchRef.current = now;
    setLoading(false);
  };

  return {
    weather,
    locationName,
    pm25,
    loading,
    loadWeather,
  };
}
