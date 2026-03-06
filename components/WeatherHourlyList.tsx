import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import {
  formatHour,
  toWindArrow,
  toWindDirectionVi,
} from "../utils/weatherFormat";

import { getWeatherIcon } from "../utils/weatherCode";

export default function WeatherHourlyList({ weather }: any) {
  const [showAll, setShowAll] = useState(false);
  const [activeHour, setActiveHour] = useState<string | null>(null);

  const now = new Date();
  const currentHour = now.getHours();
  const today = now.toISOString().slice(0, 10);

  const hours = useMemo(() => {
    return weather.hourly.time
      .map((time: string, i: number) => ({
        time,

        // nhiệt độ
        temp: weather.hourly.temperature_2m?.[i],
        feelsLike: weather.hourly.apparent_temperature?.[i],
        dewPoint: weather.hourly.dewpoint_2m?.[i],

        // trạng thái thời tiết
        code: weather.hourly.weathercode?.[i],
        isDay: weather.hourly.is_day?.[i],

        // gió
        windSpeed: weather.hourly.windspeed_10m?.[i],
        windDirection: weather.hourly.winddirection_10m?.[i],
        windGust: weather.hourly.windgusts_10m?.[i],

        // mưa / tuyết
        precipitation: weather.hourly.precipitation?.[i],
        rain: weather.hourly.rain?.[i],
        snowfall: weather.hourly.snowfall?.[i],

        // độ ẩm
        humidity: weather.hourly.relativehumidity_2m?.[i],

        // mây
        cloud: weather.hourly.cloudcover?.[i],

        // tầm nhìn
        visibility: weather.hourly.visibility?.[i],

        // áp suất
        pressure: weather.hourly.pressure_msl?.[i],

        // UV
        uvIndex: weather.hourly.uv_index?.[i],

        // precipitation
        precipitation_pro: weather.hourly.precipitation_probability?.[i],
      }))
      .filter((item: any) => item.time.startsWith(today));
  }, [weather]);

  const filteredHours = useMemo(() => {
    if (showAll) return hours;

    return hours.filter((item: any) => {
      const hour = new Date(item.time).getHours();
      return hour >= currentHour;
    });
  }, [hours, showAll]);

  const toggleHour = (time: string) => {
    if (activeHour === time) {
      setActiveHour(null);
    } else {
      setActiveHour(time);
    }
  };

  const hasPrevious = currentHour > 0;

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
        const isOpen = activeHour === hour.time;

        return (
          <View key={hour.time}>
            {/* ROW */}
            <Pressable
              onPress={() => toggleHour(hour.time)}
              style={[styles.row, index > 0 && styles.border]}
            >
              <Text style={styles.time}>{formatHour(hour.time)}</Text>

              <Text style={styles.icon}>
                {getWeatherIcon(hour.code, hour.isDay)}
              </Text>
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

            {/* DETAIL */}
            {isOpen && (
              <View style={styles.detail}>
                <View style={styles.detailGrid}>
                  <View style={styles.detailItem}>
                    <Text style={styles.label}>Mưa</Text>
                    <Text style={styles.value}>
                      {hour.precipitation ?? 0} mm
                    </Text>
                  </View>

                  <View style={styles.detailItem}>
                    <Text style={styles.label}>Độ ẩm</Text>
                    <Text style={styles.value}>{hour.humidity ?? "--"}%</Text>
                  </View>

                  <View style={styles.detailItem}>
                    <Text style={styles.label}>Cảm giác như</Text>
                    <Text style={styles.value}>{hour.feelsLike ?? "--"}°</Text>
                  </View>

                  <View style={styles.detailItem}>
                    <Text style={styles.label}>Chỉ số UV</Text>
                    <Text style={styles.value}>{hour.uvIndex ?? "--"}</Text>
                  </View>

                  <View style={styles.detailItem}>
                    <Text style={styles.label}>Tầm nhìn</Text>
                    <Text style={styles.value}>
                      {hour.visibility
                        ? Math.round(hour.visibility / 1000)
                        : "--"}{" "}
                      km
                    </Text>
                  </View>

                  <View style={styles.detailItem}>
                    <Text style={styles.label}>Gió - giật</Text>
                    <Text style={styles.value}>
                      {hour.windGust ?? "--"} km/h
                    </Text>
                  </View>

                  <View style={styles.detailItem}>
                    <Text style={styles.label}>Điểm sương</Text>
                    <Text style={styles.value}>{hour.dewPoint ?? "--"}°</Text>
                  </View>

                  <View style={styles.detailItem}>
                    <Text style={styles.label}>Mây</Text>
                    <Text style={styles.value}>{hour.cloud ?? "--"}%</Text>
                  </View>

                  <View style={styles.detailItem}>
                    <Text style={styles.label}>Áp suất</Text>
                    <Text style={styles.value}>{hour.pressure ?? "--"} mb</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Text style={styles.label}>Xác xuất mưa</Text>
                    <Text style={styles.value}>
                      {hour.precipitation_pro ?? "--"} %
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </View>
        );
      })}
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
