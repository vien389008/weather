import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
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
  const isDay = weather.current_weather.is_day === 1;

  const feelsLike = Math.round(weather.hourly.apparent_temperature[0]);
  const max = Math.round(weather.daily.temperature_2m_max[0]);
  const min = Math.round(weather.daily.temperature_2m_min[0]);

  const now = new Date();
  const weekday = now.toLocaleDateString("vi-VN", {
    weekday: "short",
  });

  const time = now.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });

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
        {/* LEFT */}
        <View style={styles.left}>
          <Text style={styles.temp}>{temp}°</Text>
          <Text style={styles.desc}>{getWeatherDescription(code)}</Text>
          {/* LOCATION */}
          <Text style={styles.location}>
            <Ionicons name="location-outline" size={18} color="#fff" />{" "}
            {locationName}
          </Text>

          <Text style={styles.minmax}>
            {max}° / {min}° Cảm giác như {feelsLike}°
          </Text>

          <Text style={styles.time}>
            {weekday}, {time}
          </Text>
        </View>

        {/* RIGHT */}

        <LottieView
          source={getWeatherIcon(code, isDay)}
          autoPlay
          loop
          style={[styles.lottieWeather, { width: 180, height: 180 }]}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#86bafc",
  },
  lottieWeather: {
    position: "absolute",
    right: -16,
  },
  left: {
    flex: 1,
  },

  right: {
    justifyContent: "center",
    alignItems: "center",
  },

  temp: {
    fontSize: 72,
    fontWeight: "200",
    color: "white",
  },

  desc: {
    fontSize: 20,
    color: "white",
    marginTop: 4,
  },

  location: {
    fontSize: 16,
    color: "white",
    marginTop: 12,
  },

  minmax: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    marginTop: 4,
  },

  time: {
    fontSize: 14,
    color: "rgba(255,255,255,0.7)",
    marginTop: 2,
  },

  icon: {
    fontSize: 80,
  },
});
