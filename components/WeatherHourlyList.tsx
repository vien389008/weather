import { Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  formatHour,
  toWindArrow,
  toWindDirectionVi,
} from "../utils/weatherFormat";

import { getWeatherIcon } from "../utils/weatherCode";

export default function WeatherHourlyList({ weather, dayIndex = 0 }: any) {
  const [showAll, setShowAll] = useState(false);
  const [activeHour, setActiveHour] = useState<string | null>(null);

  const now = new Date();
  const currentHour = now.getHours();

  const selectedDate = weather.daily.time[dayIndex];
  const sunrise = weather.daily.sunrise?.[dayIndex];
  const sunset = weather.daily.sunset?.[dayIndex];

  const hours = useMemo(() => {
    const list = weather.hourly.time
      .map((time: string, i: number) => ({
        type: "hour",
        time,

        temp: weather.hourly.temperature_2m?.[i],
        feelsLike: weather.hourly.apparent_temperature?.[i],
        dewPoint: weather.hourly.dewpoint_2m?.[i],

        code: weather.hourly.weathercode?.[i],
        isDay: weather.hourly.is_day?.[i],

        windSpeed: weather.hourly.windspeed_10m?.[i],
        windDirection: weather.hourly.winddirection_10m?.[i],
        windGust: weather.hourly.windgusts_10m?.[i],
        uvIndex: weather.hourly.uv_index?.[i],
        precipitation: weather.hourly.precipitation?.[i],
        humidity: weather.hourly.relativehumidity_2m?.[i],

        visibility: weather.hourly.visibility?.[i],
        pressure: weather.hourly.pressure_msl?.[i],
        cloud: weather.hourly.cloudcover?.[i],

        precipitation_pro: weather.hourly.precipitation_probability?.[i],
      }))
      .filter((item: any) => item.time.startsWith(selectedDate));

    if (sunrise && sunrise.startsWith(selectedDate)) {
      list.push({
        type: "sunrise",
        time: sunrise,
      });
    }

    if (sunset && sunset.startsWith(selectedDate)) {
      list.push({
        type: "sunset",
        time: sunset,
      });
    }

    list.sort(
      (a: any, b: any) =>
        new Date(a.time).getTime() - new Date(b.time).getTime(),
    );

    return list;
  }, [weather, selectedDate, sunrise, sunset]);

  const filteredHours = useMemo(() => {
    if (showAll) return hours;

    if (dayIndex === 0) {
      return hours.filter((item: any) => {
        const hour = new Date(item.time).getHours();
        return hour >= currentHour;
      });
    }

    return hours;
  }, [hours, showAll, dayIndex]);

  const toggleHour = (time: string) => {
    setActiveHour(activeHour === time ? null : time);
  };

  const hasPrevious = currentHour > 0 && dayIndex === 0;

  return (
    <View style={styles.card}>
      {!showAll && hasPrevious && (
        <Pressable style={styles.beforeButton} onPress={() => setShowAll(true)}>
          <Text style={styles.beforeText}>
            Trước đó <Ionicons name="chevron-up" size={16} color="#0b7ec2" />
          </Text>
        </Pressable>
      )}

      {filteredHours.map((hour: any, index: number) => {
        const key = `${hour.type}-${hour.time}`;

        if (hour.type === "sunrise") {
          return (
            <View key={key} style={styles.sunRow}>
              <Ionicons name="sunny-outline" size={18} color="#f5a623" />
              <Text style={styles.sunText}>
                Bình minh {formatHour(hour.time)}
              </Text>
            </View>
          );
        }

        if (hour.type === "sunset") {
          return (
            <View key={key} style={styles.sunRow}>
              <Ionicons name="partly-sunny-outline" size={18} color="#f5a623" />
              <Text style={styles.sunText}>
                Hoàng hôn {formatHour(hour.time)}
              </Text>
            </View>
          );
        }

        const isOpen = activeHour === hour.time;

        return (
          <View key={key}>
            <Pressable
              onPress={() => toggleHour(hour.time)}
              style={[styles.row, index > 0 && styles.border]}
            >
              <Text style={styles.time}>{formatHour(hour.time)}</Text>

              <LottieView
                source={getWeatherIcon(hour.code, hour.isDay)}
                autoPlay
                loop
                style={{ width: 40, height: 40 }}
              />
              <Text style={styles.temp}>{Math.round(hour.temp)}°</Text>

              <Text style={styles.arrow}>
                {toWindArrow(hour.windDirection)}
              </Text>

              <View style={styles.wind}>
                <Text style={styles.windDirection}>
                  {toWindDirectionVi(hour.windDirection)}
                </Text>

                <Text style={styles.windSpeed}>
                  {Math.round(hour.windSpeed)} km/h
                </Text>
              </View>

              <Ionicons
                name={isOpen ? "chevron-up" : "chevron-down"}
                size={20}
                color="#0b7ec2"
              />
            </Pressable>

            {isOpen && (
              <View style={styles.detail}>
                <View style={styles.detailGrid}>
                  <Detail label="Mưa" value={`${hour.precipitation ?? 0} mm`} />
                  <Detail label="Độ ẩm" value={`${hour.humidity ?? "--"}%`} />
                  <Detail
                    label="Cảm giác như"
                    value={`${hour.feelsLike ?? "--"}°`}
                  />
                  <Detail label="Chỉ số UV" value={hour.uvIndex ?? "--"} />
                  <Detail
                    label="Tầm nhìn"
                    value={
                      hour.visibility
                        ? `${Math.round(hour.visibility / 1000)} km`
                        : "--"
                    }
                  />
                  <Detail
                    label="Gió - giật"
                    value={`${hour.windGust ?? "--"} km/h`}
                  />
                  <Detail
                    label="Điểm sương"
                    value={`${hour.dewPoint ?? "--"}°`}
                  />
                  <Detail label="Mây" value={`${hour.cloud ?? "--"}%`} />
                  <Detail
                    label="Áp suất"
                    value={`${hour.pressure ?? "--"} mb`}
                  />
                  <Detail
                    label="Xác xuất mưa"
                    value={`${hour.precipitation_pro ?? "--"} %`}
                  />
                </View>
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}

function Detail({ label, value }: any) {
  return (
    <View style={{ width: "33%", marginBottom: 12 }}>
      <Text style={{ fontSize: 12, color: "#6f7f8d" }}>{label}</Text>
      <Text style={{ fontSize: 14, fontWeight: "600" }}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
  },

  beforeButton: {
    alignSelf: "center",
  },

  beforeText: {
    fontSize: 17,
    color: "#0b7ec2",
    fontWeight: "700",
    paddingVertical: 14,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },

  border: {
    borderTopWidth: 1,
    borderColor: "#e6e9ec",
  },
  sunRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    backgroundColor: "#fff6e0",
    borderTopWidth: 1,
    borderColor: "#e6e9ec",
  },

  sunText: {
    marginLeft: 6,
    fontSize: 13,
    fontWeight: "600",
    color: "#a87400",
  },
  time: {
    width: 62,
    fontSize: 17,
    fontWeight: "700",
  },

  icon: {
    width: 44,
    fontSize: 27,
    textAlign: "center",
  },

  temp: {
    width: 56,
    fontSize: 19,
    fontWeight: "700",
  },

  arrow: {
    marginRight: 6,
    fontSize: 22,
    color: "#1398dd",
  },

  wind: {
    flex: 1,
  },

  windDirection: {
    fontSize: 16,
    color: "#4f6273",
    fontWeight: "600",
  },

  windSpeed: {
    fontSize: 16,
    color: "#4f6273",
  },

  detail: {
    backgroundColor: "#f5f7f9",
    padding: 12,
    borderRadius: 6,
    marginBottom: 10,
  },

  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },

  detailGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  detailItem: {
    width: "50%",
    paddingVertical: 6,
  },

  label: {
    fontSize: 14,
    color: "#6b7c8c",
  },

  value: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2f3e4e",
  },
});
