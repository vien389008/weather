import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";
import { getAQILevel } from "../utils/airQuality";

export default function AirQualityCard({ pm25 }: any) {
  const aqi = getAQILevel(pm25);

  // vị trí chấm tròn
  const percent = Math.min(pm25 / 150, 1) * 100;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Chất lượng không khí</Text>
        <Text style={styles.detail}>Chi tiết</Text>
      </View>

      <View style={styles.row}>
        <View style={[styles.aqiBox, { backgroundColor: aqi.color }]}>
          <Text style={styles.aqiText}>{Math.round(pm25)}</Text>
        </View>

        <View>
          <Text style={styles.status}>{aqi.text}</Text>
          <Text style={styles.pm}>PM₂.₅ ({pm25} µg/m³)</Text>
        </View>
      </View>

      {/* Thanh AQI */}
      <View style={styles.barWrapper}>
        <LinearGradient
          colors={[
            "#00bcd4",
            "#4caf50",
            "#ffeb3b",
            "#ff9800",
            "#f44336",
            "#8e24aa",
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.bar}
        />

        {/* Chấm tròn */}
        <View
          style={[
            styles.dot,
            {
              left: `${percent}%`,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    marginBottom: 160,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
  },

  detail: {
    color: "#007aff",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  aqiBox: {
    width: 60,
    height: 60,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  aqiText: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
  },

  status: {
    fontSize: 16,
    fontWeight: "600",
  },

  pm: {
    color: "#555",
  },

  barWrapper: {
    position: "relative",
    height: 8,
    borderRadius: 4,
    overflow: "visible",
  },

  bar: {
    height: 8,
    borderRadius: 4,
  },

  dot: {
    position: "absolute",
    top: -4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "white",
    borderWidth: 3,
    borderColor: "#ff5722",
  },
});
