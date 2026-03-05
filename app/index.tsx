import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import AirQualityCard from "../components/AirQualityCard";
import CurrentWeather from "../components/CurrentWeather";
import DailyWeather from "../components/DailyWeather";
import HourlyWeather from "../components/HourlyWeather";
import LunarCard from "../components/LunarCard";
import SunCard from "../components/SunCard";

import { getAirQuality } from "../services/airQualityApi";
import { getWeather } from "../services/weatherApi";

import { useWeatherStore } from "../stores/weatherStore";
import { getMoonPhase } from "../utils/moonPhase";

export default function HomeScreen() {
  const weather = useWeatherStore((s) => s.weather);
  const setWeather = useWeatherStore((s) => s.setWeather);

  const coords = useWeatherStore((s) => s.coords);
  const setCoords = useWeatherStore((s) => s.setCoords);

  const locationName = useWeatherStore((s) => s.locationName);
  const setLocationName = useWeatherStore((s) => s.setLocationName);

  const [pm25, setPm25] = useState<number | null>(null);
  const [loading, setLoading] = useState(!weather);
  const [refreshing, setRefreshing] = useState(false);
  const [timeNow, setTimeNow] = useState("");

  const [lunarDays, setLunarDays] = useState<any[]>([]);

  const lastFetchRef = useRef<number | null>(null);

  useEffect(() => {
    if (!weather) {
      loadWeather();
    }
    loadLunarMonth();
  }, []);

  useEffect(() => {
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const updateTime = () => {
    const now = new Date();

    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");

    const days = [
      "Chủ nhật",
      "Thứ hai",
      "Thứ ba",
      "Thứ tư",
      "Thứ năm",
      "Thứ sáu",
      "Thứ bảy",
    ];

    const dayName = days[now.getDay()];

    setTimeNow(`${hours}:${minutes} ${dayName}`);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    lastFetchRef.current = null;
    await loadWeather(true);
    setRefreshing(false);
  };

  const getCoords = async () => {
    if (coords) return coords;

    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      setLocationName("Không có quyền vị trí");
      return null;
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });

    const lat = location.coords.latitude;
    const lon = location.coords.longitude;

    setCoords({ lat, lon });

    const reverse = await Location.reverseGeocodeAsync({
      latitude: lat,
      longitude: lon,
    });

    if (reverse.length > 0) {
      const place = reverse[0];

      const name =
        place.subregion && place.region
          ? `${place.subregion}, ${place.region}`
          : place.region || "Việt Nam";

      setLocationName(name);
    }

    return { lat, lon };
  };

  const loadWeather = async (force = false) => {
    try {
      const now = Date.now();

      if (
        !force &&
        lastFetchRef.current &&
        now - lastFetchRef.current < 10 * 60 * 1000
      ) {
        console.log("Weather cache valid");
        setLoading(false);
        return;
      }

      const location = await getCoords();
      if (!location) return;

      const { lat, lon } = location;

      const [weatherData, air] = await Promise.all([
        getWeather(lat, lon),
        getAirQuality(lat, lon),
      ]);

      setWeather(weatherData);
      setPm25(air);

      lastFetchRef.current = now;

      setLoading(false);
    } catch (error) {
      console.log("Weather load error:", error);
      setLoading(false);
    }
  };

  const loadLunarMonth = () => {
    const today = new Date();

    const startOffset = today.getDay() === 0 ? 6 : today.getDay() - 1;

    const days = [];

    for (let i = 0; i < startOffset; i++) {
      days.push({ empty: true });
    }

    for (let i = 0; i <= 15; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);

      const phase = getMoonPhase(date);

      days.push({
        day: date.getDate(),
        phase,
        date,
      });
    }

    setLunarDays(days);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Đang tải thời tiết...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.location}>📍 {locationName}</Text>
      </View>

      <Text style={styles.time}>{timeNow}</Text>

      <CurrentWeather weather={weather} />

      <HourlyWeather weather={weather} />

      <DailyWeather weather={weather} />

      <SunCard weather={weather} />

      <LunarCard days={lunarDays} />

      {pm25 && <AirQualityCard pm25={pm25} />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 50,
    backgroundColor: "#f5f5f5",
  },

  header: {
    marginBottom: 15,
  },

  location: {
    fontSize: 20,
    fontWeight: "600",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  time: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
});
