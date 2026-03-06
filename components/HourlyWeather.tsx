import { curveMonotoneX, line } from "d3-shape";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
import { formatHour } from "../utils/format";
import { getWeatherIcon } from "../utils/weatherCode";
import HumidityDrop from "./HumidityDrop";

export default function HourlyWeather({ weather }: any) {
  if (!weather) return null;

  const times = weather.hourly.time;
  const temps = weather.hourly.temperature_2m;
  const codes = weather.hourly.weathercode;
  const precipitation = weather.hourly.precipitation_probability;
  const day = weather.hourly.is_day;

  const now = new Date();

  const startIndex = times.findIndex((t: string) => {
    const time = new Date(t);
    return time.getHours() === now.getHours();
  });

  const start = startIndex === -1 ? 0 : startIndex;

  const hours = times.slice(start, start + 24);
  const temperatures = temps.slice(start, start + 24);
  const weatherCodes = codes.slice(start, start + 24);
  const precipitationValues = precipitation.slice(start, start + 24);
  const is_day = day.slice(start, start + 24);

  const maxTemp = Math.max(...temperatures);
  const minTemp = Math.min(...temperatures);

  const width = 70;
  const chartHeight = 40;
  const padding = 6;

  const range = maxTemp - minTemp || 1;

  const points: [number, number][] = temperatures.map(
    (t: number, i: number) => {
      const x = i * width + width / 2;

      const y = padding + chartHeight - ((t - minTemp) / range) * chartHeight;

      return [x, y];
    },
  );

  const path = line()
    .x((d: any) => d[0])
    .y((d: any) => d[1])
    .curve(curveMonotoneX)(points as any);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hằng giờ</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          {/* TIME + ICON */}
          <View style={styles.row}>
            {hours.map((time: string, i: number) => (
              <View key={i} style={styles.item}>
                <Text style={styles.time}>{formatHour(time)}</Text>

                <Text style={styles.icon}>
                  {getWeatherIcon(weatherCodes[i], is_day[i])}
                </Text>
                <Text style={styles.temp}>{Math.round(temperatures[i])}°</Text>
              </View>
            ))}
          </View>

          {/* LINE CHART */}
          <Svg
            style={styles.path}
            height={chartHeight + padding * 2}
            width={hours.length * width}
          >
            <Path
              d={path || ""}
              stroke="#FFD54F"
              strokeWidth={2}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {points.map((p, i) => (
              <Circle key={i} cx={p[0]} cy={p[1]} r={3} fill="#FFD54F" />
            ))}
          </Svg>

          {/* PRECIPITATION */}
          <View style={styles.row}>
            {precipitationValues.map((h: number, i: number) => (
              <View key={i} style={styles.item}>
                <View style={styles.flexRow}>
                  <HumidityDrop percent={Math.round(h)} size={20} />
                  <Text style={styles.humidity}>{Math.round(h)}%</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#7C8EF8",
    padding: 16,
    borderRadius: 12,
    marginVertical: 10,
    paddingLeft: 0,
    marginBottom: 16,
  },

  title: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
    marginBottom: 10,
    paddingLeft: 16,
  },

  row: {
    flexDirection: "row",
    marginBottom: 16,
  },

  path: {
    marginBottom: 10,
  },

  item: {
    width: 70,
    alignItems: "center",
  },

  time: {
    color: "#fff",
  },

  icon: {
    fontSize: 20,
    marginVertical: 4,
  },

  temp: {
    color: "#fff",
    fontWeight: "600",
  },

  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  humidityIcon: {
    fontSize: 14,
    color: "#7EC8FF",
  },

  humidity: {
    fontSize: 14,
    color: "#FFF",
    marginTop: 2,
  },
});
