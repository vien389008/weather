import * as Location from "expo-location";
import { useEffect, useState } from "react";
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
import { getMoonPhase } from "../utils/moonPhase";
export default function HomeScreen() {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [locationName, setLocationName] = useState("Đang lấy vị trí...");
  const [lunarDays, setLunarDays] = useState<any[]>([]);
  const [pm25, setPm25] = useState<number | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null,
  );
  const [timeNow, setTimeNow] = useState("");
  const onRefresh = async () => {
    setRefreshing(true);
    await loadWeather();
    setRefreshing(false);
  };
  useEffect(() => {
    loadWeather();
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
  console.log("Current time:", timeNow);
  const loadWeather = async () => {
    try {
      let lat;
      let lon;

      if (!coords) {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          setLocationName("Không có quyền vị trí");
          setLoading(false);
          return;
        }

        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        lat = location.coords.latitude;
        lon = location.coords.longitude;

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
      } else {
        lat = coords.lat;
        lon = coords.lon;
      }

      const [weatherData, air] = await Promise.all([
        getWeather(lat, lon),
        getAirQuality(lat, lon),
      ]);

      setWeather(weatherData);
      setPm25(air);
      setLoading(false);
    } catch (error) {
      console.log("Weather load error:", error);
      setLoading(false);
    }
  };
  const loadLunarMonth = () => {
    const today = new Date();

    // chuyển thứ về dạng bắt đầu từ T2
    const startOffset = today.getDay() === 0 ? 6 : today.getDay() - 1;

    const days = [];

    // tạo ô trống đầu tuần
    for (let i = 0; i < startOffset; i++) {
      days.push({ empty: true });
    }

    // hôm nay + 15 ngày
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
