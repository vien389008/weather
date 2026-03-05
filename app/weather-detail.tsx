import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WeatherDayTabs from "../components/WeatherDayTabs";
import WeatherHeader from "../components/WeatherHeader";
import WeatherHourlyList from "../components/WeatherHourlyList";
import WeatherSummary from "../components/WeatherSummary";

type WeatherData = {
  hourly: {
    time: string[];
    temperature_2m: number[];
    weathercode: number[];
    windspeed_10m: number[];
    winddirection_10m: number[];
  };
  daily: {
    time: string[];
    weathercode: number[];
  };
  current_weather: {
    weathercode: number;
  };
};

export default function WeatherDetail() {
  const params = useLocalSearchParams();

  const weather: WeatherData = JSON.parse(params.weather as string);
  const locationName = params.locationName as string;

  return (
    <SafeAreaView style={styles.safeArea}>
      <WeatherHeader locationName={locationName} />

      <WeatherDayTabs tabs={weather.daily.time.slice(0, 7)} />

      <ScrollView contentContainerStyle={styles.content}>
        <WeatherSummary weather={weather} />

        <WeatherHourlyList weather={weather} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#eef0f2",
  },

  content: {
    padding: 8,
    gap: 10,
  },
});
