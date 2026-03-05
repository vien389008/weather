import { StyleSheet, Text, View } from "react-native";
import { getAQILevel } from "../utils/airQuality";

export default function AirQualityCard({ pm25 }: any) {
  const aqi = getAQILevel(pm25);

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

          <Text style={styles.pm}>PM2.5 ({pm25} µg/m³)</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F5F6F8",
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
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
});
