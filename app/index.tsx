import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

import AirQualityCard from "../components/AirQualityCard";
import CurrentWeather from "../components/CurrentWeather";
import DailyWeather from "../components/DailyWeather";
import DrawerMenu from "../components/DrawerMenu";
import HourlyWeather from "../components/HourlyWeather";
import LunarCard from "../components/LunarCard";
import SunCard from "../components/SunCard";

import useLunar from "../hooks/useLunar";
import useWeather from "../hooks/useWeather";

export default function HomeScreen() {
  const { weather, locationName, pm25, loading, loadWeather } = useWeather();
  const lunarDays = useLunar();

  const [refreshing, setRefreshing] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(-260)).current;

  const openMenu = () => {
    setMenuOpen(true);

    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: -260,
      duration: 250,
      useNativeDriver: true,
    }).start(() => setMenuOpen(false));
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadWeather(true);
    setRefreshing(false);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Đang tải thời tiết...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />

      <ScrollView
        scrollEnabled={!menuOpen}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.homePadding}>
          <Pressable onPress={openMenu}>
            <Text style={styles.menuIcon}>☰</Text>
          </Pressable>

          <Text style={styles.location}>
            <Ionicons name="location-outline" size={18} color="#fff" />{" "}
            {locationName}
          </Text>

          <CurrentWeather weather={weather} />
          <HourlyWeather weather={weather} />
          <DailyWeather weather={weather} />
          <SunCard weather={weather} />
          <LunarCard days={lunarDays} />

          {pm25 && <AirQualityCard pm25={pm25} />}
        </View>
      </ScrollView>

      {menuOpen && <DrawerMenu slideAnim={slideAnim} closeMenu={closeMenu} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#86bafc",
  },

  homePadding: {
    paddingHorizontal: 16,
  },

  menuIcon: {
    fontSize: 32,
    color: "#fff",
    marginVertical: 10,
  },

  location: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 10,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
