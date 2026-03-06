import { StyleSheet, Text, View } from "react-native";
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

export default function DailyWeather({ weather }: any) {
  if (!weather) return null;

  const days = weather.daily.time.slice(0, 7);
  const max = weather.daily.temperature_2m_max.slice(0, 7);
  const min = weather.daily.temperature_2m_min.slice(0, 7);
  const codes = weather.daily.weathercode.slice(0, 7);
  const is_day = true;
  const rainProb = weather.daily.precipitation_probability_mean?.slice(0, 7);
  const rainSum = weather.daily.precipitation_sum?.slice(0, 7);

  const windSpeed = weather.daily.windspeed_10m_max?.slice(0, 7);
  const windDir = weather.daily.winddirection_10m_dominant?.slice(0, 7);

  return (
    <View style={styles.container}>
      {days.map((day: string, i: number) => {
        const showRain = rainProb && rainProb[i] > 0;

        return (
          <View
            key={i}
            style={[
              styles.row,
              i === days.length - 1 && { borderBottomWidth: 0 },
            ]}
          >
            {/* ngày */}
            <View style={styles.leftDay}>
              <Text style={styles.day}>{formatDay(day).label}</Text>
              <Text style={styles.subDay}>{formatDay(day).sub}</Text>
            </View>

            {/* icon + rain */}
            <View style={styles.weatherBlock}>
              <Text style={styles.icon}>
                {getWeatherIcon(codes[i], is_day)}
              </Text>
              <View style={styles.rain}>
                <Text style={styles.rainText}>{rainProb[i]}%</Text>
                <Text style={styles.rainText}>{rainSum[i]?.toFixed(1)} mm</Text>
              </View>
            </View>

            {/* nhiệt độ */}
            <Text style={styles.temp}>
              <Text style={styles.max}>{Math.round(max[i])}°</Text> /{" "}
              <Text style={styles.min}>{Math.round(min[i])}°</Text>
            </Text>

            {/* gió */}
            <View style={styles.wind}>
              <Text style={styles.windArrow}>
                {getWindArrow(windDir?.[i] || 0)}
              </Text>
              <Text style={styles.windText}>
                {Math.round(windSpeed?.[i] || 0)} km/h
              </Text>
            </View>

            {/* arrow detail */}
            <Text style={styles.arrow}>›</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    justifyContent: "space-between",
  },

  leftDay: {
    width: 70,
  },

  day: {
    fontSize: 16,
    fontWeight: "600",
  },

  subDay: {
    fontSize: 12,
    color: "#777",
  },

  weatherBlock: {
    width: 70,
    alignItems: "center",
  },

  icon: {
    fontSize: 22,
  },

  rain: {
    alignItems: "center",
  },

  rainText: {
    fontSize: 12,
    color: "#1e88e5",
  },

  temp: {
    fontSize: 20,
    fontWeight: "600",
  },

  max: {
    color: "#e53935",
    fontWeight: "600",
  },

  min: {
    color: "#555",
  },

  wind: {
    width: 60,
    alignItems: "center",
  },

  windArrow: {
    fontSize: 16,
    color: "#2196f3",
  },

  windText: {
    fontSize: 12,
    color: "#555",
  },

  arrow: {
    fontSize: 22,
    color: "#999",
    paddingHorizontal: 5,
  },
});
