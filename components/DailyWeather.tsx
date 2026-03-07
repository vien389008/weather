import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { formatDay } from "../utils/format";
import { getWeatherIcon } from "../utils/weatherCode";

function getWindArrow(deg: number) {
  if (deg >= 337 || deg < 22) return "↑";
  if (deg < 67) return "↗";
  if (deg < 112) return "→";
  if (deg < 157) return "↘";
  if (deg < 202) return "↓";
  if (deg < 247) return "↙";
  if (deg < 292) return "←";
  return "↖";
}

export default function DailyWeather({ weather, locationName }: any) {
  const navigation = useNavigation<any>();

  if (!weather?.daily) return null;

  const days = weather.daily.time?.slice(0, 14) ?? [];
  const max = weather.daily.temperature_2m_max?.slice(0, 14) ?? [];
  const min = weather.daily.temperature_2m_min?.slice(0, 14) ?? [];
  const codes = weather.daily.weathercode?.slice(0, 14) ?? [];

  const rainProb =
    weather.daily.precipitation_probability_mean?.slice(0, 14) ?? [];

  const rainSum = weather.daily.precipitation_sum?.slice(0, 14) ?? [];

  const windSpeed = weather.daily.windspeed_10m_max?.slice(0, 14) ?? [];

  const windDir = weather.daily.winddirection_10m_dominant?.slice(0, 14) ?? [];

  const is_day = true;

  return (
    <View style={styles.container}>
      {days.map((day: string, i: number) => {
        const dayData = formatDay(day);

        return (
          <Pressable
            key={i}
            style={[
              styles.row,
              i === days.length - 1 && { borderBottomWidth: 0 },
            ]}
            onPress={() =>
              navigation.navigate("weather-detail", {
                dayIndex: i,
                date: day,
                weather: JSON.stringify(weather),
                locationName: locationName || "",
              })
            }
          >
            {/* ngày */}
            <View style={styles.leftDay}>
              <Text style={styles.day}>{dayData.label}</Text>
              <Text style={styles.subDay}>{dayData.sub}</Text>
            </View>

            {/* icon + rain */}
            <View style={styles.weatherBlock}>
              <LottieView
                source={getWeatherIcon(codes[i], is_day)}
                autoPlay
                loop
                style={{ width: 30, height: 30 }}
              />

              <View style={styles.rain}>
                <Text style={styles.rainText}>{rainProb?.[i] ?? 0}%</Text>

                <Text style={styles.rainText}>
                  {rainSum?.[i]?.toFixed?.(1) ?? "0"} mm
                </Text>
              </View>
            </View>

            {/* nhiệt độ */}
            <Text style={styles.temp}>
              <Text style={styles.max}>{Math.round(max?.[i] ?? 0)}°</Text>/
              <Text style={styles.min}>{Math.round(min?.[i] ?? 0)}°</Text>
            </Text>

            {/* gió */}
            <View style={styles.wind}>
              <Text style={styles.windArrow}>
                {getWindArrow(windDir?.[i] ?? 0)}
              </Text>

              <Text style={styles.windText}>
                {Math.round(windSpeed?.[i] ?? 0)} km/h
              </Text>
            </View>

            {/* arrow */}
            <Text style={styles.arrow}>›</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.08)",
    marginBottom: 16,
  },

  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingLeft: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    backgroundColor: "#FFF",
    justifyContent: "space-between",
    alignContent: "center",
    width: "100%",
  },

  leftDay: {
    width: 58,
  },

  day: {
    fontSize: 14,
    fontWeight: "600",
  },

  subDay: {
    color: "#cccccc",
    fontSize: 12,
  },

  weatherBlock: {
    flexDirection: "row",
    alignItems: "center",
  },

  rain: {
    marginLeft: 4,
  },

  rainText: {
    fontSize: 12,
  },

  temp: {
    fontSize: 16,
  },

  max: {
    color: "#bc504c",
  },

  min: {
    color: "#386dc5",
  },

  wind: {
    flexDirection: "row",
    alignItems: "center",
    width: 80,
  },

  windArrow: {
    fontSize: 16,
    marginRight: 0,
  },

  windText: {
    fontSize: 12,
  },

  arrow: {
    color: "#386dc5",
    fontSize: 24,
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -6 }],
    fontWeight: "700",
  },
});
