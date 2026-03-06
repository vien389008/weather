import { Animated, Pressable, StyleSheet, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function DrawerMenu({ slideAnim, closeMenu }: any) {
  const insets = useSafeAreaInsets();

  return (
    <Pressable
      style={[
        styles.overlay,
        {
          top: insets.top, // tránh đè status bar
          bottom: insets.bottom,
        },
      ]}
      onPress={closeMenu}
    >
      <Animated.View
        style={[styles.drawer, { transform: [{ translateX: slideAnim }] }]}
      >
        <Text style={styles.item}>Dự báo</Text>
        <Text style={styles.item}>Radar thời tiết</Text>
        <Text style={styles.item}>Bản đồ</Text>
        <Text style={styles.item}>Cài đặt</Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0.3)",
  },

  drawer: {
    width: 260,
    height: "100%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  item: {
    fontSize: 18,
    marginBottom: 25,
  },
});
