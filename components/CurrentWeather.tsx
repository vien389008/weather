import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { getWeatherDescription, getWeatherIcon } from "../utils/weatherCode";

type Props = {
  weather: any;
  locationName?: string;
};

export default function CurrentWeather({ weather, locationName }: Props) {
  if (!weather) return null;

  const temp = Math.round(weather.current_weather.temperature);
  const code = weather.current_weather.weathercode;

  const handlePress = () => {
    router.push({
      pathname: "/weather-detail",
      params: {
        weather: JSON.stringify(weather),
        locationName: locationName || "",
      },
    });
  };

  return (
    <Pressable onPress={handlePress}>
      <View style={styles.card}>
        <View>
          <Text style={styles.status}>{getWeatherDescription(code)}</Text>

          <Text style={styles.temp}>{temp}°</Text>

          <Text style={styles.feel}>Cảm giác như {temp}°</Text>
        </View>

        <View style={styles.right}>
          <Text style={styles.icon}>{getWeatherIcon(code)}</Text>

          <Text style={styles.uv}>UV 3 Trung bình</Text>

          <Text style={styles.spf}>SPF 6-10</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#69b6d6",
    borderRadius: 14,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  status: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 6,
  },

  temp: {
    fontSize: 60,
    fontWeight: "700",
    color: "#000",
    lineHeight: 64,
  },

  feel: {
    color: "#fff",
    fontSize: 15,
    marginTop: 4,
  },

  right: {
    alignItems: "center",
  },

  icon: {
    fontSize: 32,
    marginBottom: 4,
  },

  uv: {
    color: "#fff",
    fontSize: 14,
  },

  spf: {
    color: "#fff",
    fontSize: 13,
    marginTop: 2,
  },
});
