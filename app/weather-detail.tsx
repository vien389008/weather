import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

const hourlyData = [
  { time: "14:00", temp: "24°", windDirection: "Phía đông", windSpeed: "3 - 13 km/h", arrow: "←" },
  { time: "15:00", temp: "24°", windDirection: "Đông Nam", windSpeed: "3 - 12 km/h", arrow: "↖" },
  { time: "16:00", temp: "24°", windDirection: "Đông Nam", windSpeed: "4 - 11 km/h", arrow: "↖" },
  { time: "17:00", temp: "23°", windDirection: "Đông Nam", windSpeed: "3 - 11 km/h", arrow: "↖" },
  { time: "18:00", temp: "23°", windDirection: "Phía đông", windSpeed: "2 - 6 km/h", arrow: "←" },
] as const;

export default function WeatherDetail() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="#1f8ecf" />
        <Text numberOfLines={1} style={styles.headerTitle}>
          Đối Diện Nhà CT5 KĐT Sông Đà...
        </Text>
      </View>

      <View style={styles.dayTabs}>
        <Text style={[styles.tabItem, styles.activeTab]}>HÔM NAY</Text>
        <Text style={styles.tabItem}>NGÀY MAI</Text>
        <Text style={styles.tabItem}>T.7 7</Text>
        <Text style={styles.tabItem}>CN 8</Text>
        <Text style={styles.tabItem}>T.2 9</Text>
      </View>

      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryIcon}>🌥️</Text>
            <View>
              <Text style={styles.summaryDate}>Thứ năm tháng 3 5</Text>
              <Text style={styles.summaryMain}>Ít mây</Text>
              <Text style={styles.summarySub}>Gần cả ngày</Text>
            </View>
          </View>
          <Ionicons name="chevron-down" size={22} color="#0b7ec2" />
        </View>

        <View style={styles.hourlyCard}>
          <Text style={styles.beforeText}>
            Trước đó <Ionicons name="chevron-up" size={16} color="#0b7ec2" />
          </Text>

          {hourlyData.map((hour, index) => (
            <View
              key={hour.time}
              style={[styles.hourlyRow, index < hourlyData.length - 1 && styles.rowBorder]}
            >
              <Text style={styles.timeText}>{hour.time}</Text>
              <Text style={styles.cloudIcon}>☁️</Text>
              <Text style={styles.tempText}>{hour.temp}</Text>
              <Text style={styles.windArrow}>{hour.arrow}</Text>
              <View style={styles.windWrap}>
                <Text style={styles.windDirection}>{hour.windDirection}</Text>
                <Text style={styles.windSpeed}>{hour.windSpeed}</Text>
              </View>
              <Ionicons name="chevron-down" size={20} color="#0b7ec2" />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#eef0f2",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 12,
    backgroundColor: "#fff",
  },
  headerTitle: {
    flex: 1,
    fontSize: 33 / 2,
    fontWeight: "600",
    color: "#2e566f",
  },
  dayTabs: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderColor: "#d7d9dd",
  },
  tabItem: {
    fontSize: 14,
    color: "#7f8f9d",
    fontWeight: "700",
    marginRight: 20,
    paddingVertical: 14,
  },
  activeTab: {
    color: "#3e5567",
    borderBottomWidth: 3,
    borderColor: "#2f97d8",
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 8,
    gap: 10,
  },
  summaryCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  summaryIcon: {
    fontSize: 38,
  },
  summaryDate: {
    fontSize: 18,
    color: "#4c5f6f",
    fontWeight: "700",
  },
  summaryMain: {
    fontSize: 36 / 2,
    color: "#33495b",
  },
  summarySub: {
    marginTop: 2,
    fontSize: 14,
    color: "#667a8c",
  },
  hourlyCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  beforeText: {
    alignSelf: "center",
    fontSize: 34 / 2,
    color: "#0b7ec2",
    fontWeight: "700",
    paddingVertical: 14,
  },
  hourlyRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  rowBorder: {
    borderTopWidth: 1,
    borderColor: "#e6e9ec",
  },
  timeText: {
    width: 62,
    fontSize: 34 / 2,
    color: "#506170",
    fontWeight: "700",
  },
  cloudIcon: {
    width: 44,
    fontSize: 27,
    textAlign: "center",
  },
  tempText: {
    width: 56,
    fontSize: 38 / 2,
    color: "#445a6d",
    fontWeight: "700",
  },
  windArrow: {
    marginRight: 6,
    color: "#1398dd",
    fontSize: 22,
    fontWeight: "700",
  },
  windWrap: {
    flex: 1,
  },
  windDirection: {
    fontSize: 16,
    color: "#4f6273",
    fontWeight: "600",
  },
  windSpeed: {
    marginTop: 2,
    fontSize: 16,
    color: "#4f6273",
    fontWeight: "600",
  },
});
