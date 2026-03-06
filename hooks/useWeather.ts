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
    if (!weather) {
      loadWeather();
    } else {
      setLoading(false);
    }
  }, []);

  const getCoords = async () => {
    if (coords) return coords;

    try {
      // kiểm tra quyền trước
      const permission = await Location.getForegroundPermissionsAsync();
      let status = permission.status;

      if (status !== "granted") {
        const request = await Location.requestForegroundPermissionsAsync();
        status = request.status;
      }

      if (status !== "granted") {
        const fallback = { lat: 21.0285, lon: 105.8542 };
        setCoords(fallback);
        setLocationName("Hà Nội");
        return fallback;
      }

      // ⚡ lấy vị trí cached trước (rất nhanh)
      const last = await Location.getLastKnownPositionAsync();

      if (last) {
        const result = {
          lat: last.coords.latitude,
          lon: last.coords.longitude,
        };

        setCoords(result);

        // reverse geocode chạy async để không block UI
        setTimeout(() => {
          Location.reverseGeocodeAsync({
            latitude: result.lat,
            longitude: result.lon,
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
        }, 300);

        return result;
      }

      // fallback nếu không có cached location
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Low,
      });

      const lat = location.coords.latitude;
      const lon = location.coords.longitude;

      const result = { lat, lon };

      setCoords(result);

      setTimeout(() => {
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
      }, 300);

      return result;
    } catch (err) {
      console.log("Location error:", err);

      const fallback = { lat: 21.0285, lon: 105.8542 };
      setCoords(fallback);
      setLocationName("Hà Nội");

      return fallback;
    }
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

    try {
      const { lat, lon } = await getCoords();

      // ⚡ load weather trước
      const weatherData = await getWeather(lat, lon);
      setWeather(weatherData);

      // ⚡ air quality chạy async
      getAirQuality(lat, lon)
        .then((air) => setPm25(air))
        .catch(() => setPm25(null));

      lastFetchRef.current = now;
    } catch (err) {
      console.log("Weather error:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    weather,
    locationName,
    pm25,
    loading,
    loadWeather,
  };
}
