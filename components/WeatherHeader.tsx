import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function WeatherHeader({ locationName }: any) {
  return (
    <View style={styles.header}>
      <Pressable onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#1f8ecf" />
      </Pressable>

      <Text numberOfLines={1} style={styles.title}>
        {locationName}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
  },

  title: {
    flex: 1,
    fontSize: 17,
    fontWeight: "600",
    color: "#2e566f",
  },
});
