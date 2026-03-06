import { StyleSheet, Text, View } from "react-native";
import { getMoonIcon } from "../utils/moonIcon";

export default function LunarCard({ days }: any) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Chu kỳ mặt trăng</Text>

      <View style={styles.week}>
        {["T.2", "T.3", "T.4", "T.5", "T.6", "T.7", "CN"].map((d) => (
          <Text key={d} style={styles.weekDay}>
            {d}
          </Text>
        ))}
      </View>

      <View style={styles.grid}>
        {days.map((d: any, i: number) => {
          if (d.empty) {
            return <View key={i} style={styles.cell} />;
          }

          return (
            <View key={i} style={styles.cell}>
              <Text style={styles.day}>{d.day}</Text>

              <Text style={styles.moon}>{getMoonIcon(d.phase)}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },

  week: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  weekDay: {
    width: 40,
    textAlign: "center",
    color: "#6B7280",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  cell: {
    width: "14.28%",
    alignItems: "center",
    marginBottom: 10,
  },

  day: {
    fontSize: 16,
    marginBottom: 4,
  },

  moon: {
    fontSize: 22,
  },
});
