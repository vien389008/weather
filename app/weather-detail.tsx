import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import * as Location from "expo-location";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { getWeather } from "../services/weatherApi";
import { getWeatherDescription, getWeatherIcon } from "../utils/weatherCode";

type WeatherData = {
  hourly: {
    time: string[];
    temperature_2m: number[];
    weathercode: number[];
    windspeed_10m: number[];
    winddirection_10m: number[];
  };
  daily: {
    time: string[];
    weathercode: number[];
  };
  current_weather: {
    weathercode: number;
  };
};

const formatTabLabel = (dateStr: string, index: number) => {
  const date = new Date(dateStr);

  if (index === 0) return "HÔM NAY";
  if (index === 1) return "NGÀY MAI";

  const weekdays = ["CN", "T.2", "T.3", "T.4", "T.5", "T.6", "T.7"];

  return `${weekdays[date.getDay()]} ${date.getDate()}`;
};

const formatDateTitle = (dateStr: string) => {
  const date = new Date(dateStr);
  const weekdays = [
    "Chủ nhật",
    "Thứ hai",
    "Thứ ba",
    "Thứ tư",
    "Thứ năm",
    "Thứ sáu",
    "Thứ bảy",
  ];

  return `${weekdays[date.getDay()]} tháng ${date.getMonth() + 1} ${date.getDate()}`;
};

const toWindDirectionVi = (degree: number) => {
  if (degree >= 337.5 || degree < 22.5) return "Phía bắc";
  if (degree < 67.5) return "Đông Bắc";
  if (degree < 112.5) return "Phía đông";
  if (degree < 157.5) return "Đông Nam";
  if (degree < 202.5) return "Phía nam";
  if (degree < 247.5) return "Tây Nam";
  if (degree < 292.5) return "Phía tây";

  return "Tây Bắc";
};

const toWindArrow = (degree: number) => {
  const arrows = ["↑", "↗", "→", "↘", "↓", "↙", "←", "↖"];

  return arrows[Math.round(degree / 45) % 8];
};

const formatHour = (dateStr: string) => {
  const date = new Date(dateStr);

  return `${date.getHours().toString().padStart(2, "0")}:00`;
};

export default function WeatherDetail() {
  const [loading, setLoading] = useState(true);
  const [locationName, setLocationName] = useState("Đang lấy vị trí...");
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          setLocationName("Không có quyền vị trí");
          setLoading(false);
          return;
        }

        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        const lat = location.coords.latitude;
        const lon = location.coords.longitude;

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

        const weatherData = await getWeather(lat, lon);

        setWeather(weatherData);
      } catch {
        setLocationName("Không tải được dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const tabs = useMemo(() => {
    if (!weather) return [];

    return weather.daily.time.slice(0, 5);
  }, [weather]);

  const previousHoursToday = useMemo(() => {
    if (!weather) return [];

    const now = new Date();
    const todayYmd = now.toISOString().slice(0, 10);

    return weather.hourly.time
      .map((time, idx) => ({
        time,
        temp: weather.hourly.temperature_2m[idx],
        code: weather.hourly.weathercode[idx],
        windSpeed: weather.hourly.windspeed_10m[idx],
        windDirection: weather.hourly.winddirection_10m[idx],
      }))
      .filter((item) => {
        const date = new Date(item.time);
        const ymd = item.time.slice(0, 10);

        return ymd === todayYmd && date.getHours() < now.getHours();
      });
  }, [weather]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Đang tải chi tiết thời tiết...</Text>
      </View>
    );
  }

  if (!weather) {
    return (
      <View style={styles.centered}>
        <Text>Không có dữ liệu thời tiết.</Text>
      </View>
    );
  }

  const todayCode = weather.daily.weathercode[0] ?? weather.current_weather.weathercode;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1f8ecf" />
        </Pressable>
        <Text numberOfLines={1} style={styles.headerTitle}>
          {locationName}
        </Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dayTabs}>
        {tabs.map((d, index) => (
          <Text key={d} style={[styles.tabItem, index === 0 && styles.activeTab]}>
            {formatTabLabel(d, index)}
          </Text>
        ))}
      </ScrollView>

      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryIcon}>{getWeatherIcon(todayCode)}</Text>
            <View>
              <Text style={styles.summaryDate}>{formatDateTitle(weather.daily.time[0])}</Text>
              <Text style={styles.summaryMain}>{getWeatherDescription(todayCode)}</Text>
              <Text style={styles.summarySub}>Dữ liệu theo vị trí hiện tại</Text>
            </View>
          </View>
          <Ionicons name="chevron-down" size={22} color="#0b7ec2" />
        </View>

        <View style={styles.hourlyCard}>
          <Text style={styles.beforeText}>
            Trước đó <Ionicons name="chevron-up" size={16} color="#0b7ec2" />
          </Text>

          {previousHoursToday.length === 0 ? (
            <Text style={styles.emptyText}>Chưa có giờ nào trước thời điểm hiện tại.</Text>
          ) : (
            previousHoursToday.map((hour, index) => (
              <View
                key={hour.time}
                style={[
                  styles.hourlyRow,
                  index < previousHoursToday.length - 1 && styles.rowBorder,
                ]}
              >
                <Text style={styles.timeText}>{formatHour(hour.time)}</Text>
                <Text style={styles.cloudIcon}>{getWeatherIcon(hour.code)}</Text>
                <Text style={styles.tempText}>{Math.round(hour.temp)}°</Text>
                <Text style={styles.windArrow}>{toWindArrow(hour.windDirection)}</Text>
                <View style={styles.windWrap}>
                  <Text style={styles.windDirection}>{toWindDirectionVi(hour.windDirection)}</Text>
                  <Text style={styles.windSpeed}>{Math.round(hour.windSpeed)} km/h</Text>
                </View>
                <Ionicons name="chevron-down" size={20} color="#0b7ec2" />
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#eef0f2",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 12,
    backgroundColor: "#fff",
  },
  headerTitle: {
    flex: 1,
    fontSize: 17,
    fontWeight: "600",
    color: "#2e566f",
  },
  dayTabs: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#d7d9dd",
    maxHeight: 50,
  },
  tabItem: {
    fontSize: 14,
    color: "#7f8f9d",
    fontWeight: "700",
    marginHorizontal: 12,
    paddingVertical: 14,
  },
  activeTab: {
    color: "#3e5567",
    borderBottomWidth: 3,
    borderColor: "#2f97d8",
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 8,
    gap: 10,
  },
  summaryCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  summaryIcon: {
    fontSize: 38,
  },
  summaryDate: {
    fontSize: 18,
    color: "#4c5f6f",
    fontWeight: "700",
  },
  summaryMain: {
    fontSize: 18,
    color: "#33495b",
  },
  summarySub: {
    marginTop: 2,
    fontSize: 14,
    color: "#667a8c",
  },
  hourlyCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  beforeText: {
    alignSelf: "center",
    fontSize: 17,
    color: "#0b7ec2",
    fontWeight: "700",
    paddingVertical: 14,
  },
  emptyText: {
    color: "#667a8c",
    textAlign: "center",
    paddingBottom: 12,
  },
  hourlyRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  rowBorder: {
    borderTopWidth: 1,
    borderColor: "#e6e9ec",
  },
  timeText: {
    width: 62,
    fontSize: 17,
    color: "#506170",
    fontWeight: "700",
  },
  cloudIcon: {
    width: 44,
    fontSize: 27,
    textAlign: "center",
  },
  tempText: {
    width: 56,
    fontSize: 19,
    color: "#445a6d",
    fontWeight: "700",
  },
  windArrow: {
    marginRight: 6,
    color: "#1398dd",
    fontSize: 22,
    fontWeight: "700",
  },
  windWrap: {
    flex: 1,
  },
  windDirection: {
    fontSize: 16,
    color: "#4f6273",
    fontWeight: "600",
  },
  windSpeed: {
    marginTop: 2,
    fontSize: 16,
    color: "#4f6273",
    fontWeight: "600",
  },
});
