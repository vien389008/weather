import { ScrollView, StyleSheet, Text, View } from "react-native";
import { formatHour } from "../utils/format";
import { getWeatherIcon } from "../utils/weatherCode";

export default function HourlyWeather({ weather }: any) {
  if (!weather) return null;

  const times = weather.hourly.time;
  const temps = weather.hourly.temperature_2m;
  const codes = weather.hourly.weathercode;

  // giờ hiện tại
  const now = new Date();

  // tìm index của giờ gần nhất
  const startIndex = times.findIndex((t: string) => {
    const time = new Date(t);
    return time.getHours() === now.getHours();
  });

  // fallback nếu không tìm thấy
  const start = startIndex === -1 ? 0 : startIndex;

  // chỉ lấy 24h tới
  const hours = times.slice(start, start + 24);
  const temperatures = temps.slice(start, start + 24);
  const weatherCodes = codes.slice(start, start + 24);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>24 giờ tới</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {hours.map((time: string, i: number) => (
          <View key={i} style={styles.item}>
            <Text>{formatHour(time)}</Text>

            <Text style={styles.icon}>{getWeatherIcon(weatherCodes[i])}</Text>

            <Text>{temperatures[i]}°</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eee",
    borderRadius: 12,
    padding: 15,
    marginTop: 15,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  item: {
    alignItems: "center",
    marginRight: 20,
  },

  icon: {
    fontSize: 26,
    marginVertical: 5,
  },
});
