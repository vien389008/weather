import { ScrollView, StyleSheet, Text, View } from "react-native";
import { formatTabLabel } from "../utils/weatherFormat";
type Props = {
  tabs: string[];
  activeIndex: number;
  onChange: (index: number) => void;
};
export default function WeatherDayTabs({ tabs, activeIndex, onChange }: Props) {
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
            onPress={() => onChange(index)}
            style={[styles.tabItem, index === activeIndex && styles.activeTab]}
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
