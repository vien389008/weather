import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { getWeatherDescription, getWeatherIcon } from "../utils/weatherCode";
import { formatDateTitle } from "../utils/weatherFormat";

export default function WeatherSummary({ weather }: any) {
  const [open, setOpen] = useState(false);

  const todayCode =
    weather.daily.weathercode[0] ?? weather.current_weather.weathercode;
  const is_day = weather.daily.is_day?.[0] ?? weather.current_weather.is_day;
  const tempMax = weather.daily.temperature_2m_max?.[0];
  const tempMin = weather.daily.temperature_2m_min?.[0];

  const windMax = weather.daily.windspeed_10m_max?.[0];
  const windMin = weather.daily.windspeed_10m_min?.[0];
  const windCode = weather.daily_units.windspeed_10m_max;
  return (
    <Pressable style={styles.card} onPress={() => setOpen(!open)}>
      {/* TOP ROW */}
      <View style={styles.row}>
        <Text style={styles.icon}>{getWeatherIcon(todayCode, is_day)}</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.date}>
            {formatDateTitle(weather.daily.time[0])}
          </Text>

          <Text style={styles.main}>{getWeatherDescription(todayCode)}</Text>
        </View>

        <Ionicons
          name={open ? "chevron-up" : "chevron-down"}
          size={22}
          color="#0b7ec2"
        />
      </View>

      {/* EXPAND CONTENT */}
      {open && (
        <View style={styles.extra}>
          <View style={styles.extraRow}>
            <Ionicons name="thermometer-outline" size={20} color="#2f97d8" />

            <Text style={styles.extraText}>
              Nhiệt độ{" "}
              <Text style={styles.tempHot}>{Math.round(tempMax)}°</Text> /{" "}
              {Math.round(tempMin)}°
            </Text>
          </View>

          <View style={styles.extraRow}>
            <Ionicons name="navigate-outline" size={20} color="#2f97d8" />

            <Text style={styles.extraText}>
              Tốc độ gió {Math.round(windMin)} - {Math.round(windMax)}
              {windCode}
            </Text>
          </View>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  icon: {
    fontSize: 38,
  },

  date: {
    fontSize: 18,
    fontWeight: "700",
    color: "#4c5f6f",
  },

  main: {
    fontSize: 18,
    color: "#33495b",
  },

  sub: {
    marginTop: 2,
    fontSize: 14,
    color: "#667a8c",
  },

  extra: {
    marginTop: 12,
    gap: 10,
  },

  extraRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  extraText: {
    fontSize: 16,
    color: "#4f6273",
    fontWeight: "600",
  },

  tempHot: {
    color: "#e53935",
    fontWeight: "700",
  },
});
