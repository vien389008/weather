import { ScrollView, StyleSheet, Text, View } from "react-native";
import { formatTabLabel } from "../utils/weatherFormat";

export default function WeatherDayTabs({ tabs }: any) {
  return (
    <View style={styles.dayTabs}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {tabs.map((d: string, index: number) => (
          <Text
            key={d}
            style={[styles.tabItem, index === 0 && styles.activeTab]}
          >
            {formatTabLabel(d, index)}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  dayTabs: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#d7d9dd",
  },

  content: {
    height: 48,
    alignItems: "center",
  },

  tabItem: {
    fontSize: 14,
    color: "#7f8f9d",
    fontWeight: "700",
    marginHorizontal: 12,
    paddingVertical: 14,
  },

  activeTab: {
    color: "#3e5567",
    borderBottomWidth: 3,
    borderColor: "#2f97d8",
  },
});
