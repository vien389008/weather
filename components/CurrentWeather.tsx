import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import {
  getWeatherDescription,
  getWeatherIconHome,
} from "../utils/weatherCode";
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
  console.log("zzz:" + locationName);
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

          <Text style={styles.location}>{locationName}</Text>

          <Text style={styles.minmax}>
            {max}° / {min}° Cảm giác như {feelsLike}°
          </Text>

          <Text style={styles.time}>
            {weekday}, {time}
          </Text>
        </View>

        {/* RIGHT */}
        <Image
          source={getWeatherIconHome(code, isDay)}
          style={[styles.imageWeather, { width: 200, height: 200 }]}
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
  },
  imageWeather: {
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
    fontSize: 18,
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
