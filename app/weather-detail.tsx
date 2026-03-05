import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function WeatherDetail() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Chi tiết thời tiết</Text>

      <View style={styles.card}>
        <Text>14:00 ☁ 24° Đông 3-13 km/h</Text>
      </View>

      <View style={styles.card}>
        <Text>15:00 ☁ 24° Đông Nam 3-12 km/h</Text>
      </View>

      <View style={styles.card}>
        <Text>16:00 ☁ 24° Đông Nam 4-11 km/h</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
});
