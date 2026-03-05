import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
export default function CurrentWeather({ weather }: any) {
  if (!weather) return null;

  const temp = weather.current_weather.temperature;
  const [open, setOpen] = useState(false);
  return (
    <Pressable onPress={() => router.push("/weather-detail")}>
      <View style={styles.card}>
        <View>
          <Text style={styles.status}>Ít mây</Text>

          <Text style={styles.temp}>{temp}°</Text>

          <Text style={styles.feel}>Cảm giác như {temp}°</Text>
        </View>

        <View>
          <Text style={styles.uv}>☀</Text>
          <Text>UV 3 Trung bình</Text>
          <Text>SPF 6-10</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#69b6d6",
    borderRadius: 12,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  status: {
    fontSize: 18,
    color: "white",
  },

  temp: {
    fontSize: 60,
    fontWeight: "bold",
    color: "black",
  },

  feel: {
    color: "white",
  },

  uv: {
    fontSize: 30,
  },
});
