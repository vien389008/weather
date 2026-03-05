import { StyleSheet, Text, View } from "react-native";
import { formatDay } from "../utils/format";
import { getWeatherIcon } from "../utils/weatherCode";

export default function DailyWeather({ weather }: any) {
  if (!weather) return null;

  const days = weather.daily.time.slice(0, 7);
  const max = weather.daily.temperature_2m_max.slice(0, 7);
  const min = weather.daily.temperature_2m_min.slice(0, 7);
  const codes = weather.daily.weathercode.slice(0, 7);

  return (
    <View style={styles.container}>
      {days.map((day: string, i: number) => (
        <View key={i} style={styles.row}>
          <View style={styles.leftDay}>
            <Text style={styles.day}>{formatDay(day).label}</Text>
            <Text style={styles.subDay}>{formatDay(day).sub}</Text>
          </View>
          <Text style={styles.icon}>{getWeatherIcon(codes[i])}</Text>

          <Text style={styles.temp}>
            {Math.round(max[i])}° / {Math.round(min[i])}°
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    alignItems: "center",
  },
  leftDay: {
    width: 80,
  },
  day: {
    fontSize: 16,
  },
  subDay: {
    fontSize: 12,
  },
  icon: {
    fontSize: 22,
  },

  temp: {
    fontSize: 16,
    fontWeight: "bold",
    width: 80,
  },
});
