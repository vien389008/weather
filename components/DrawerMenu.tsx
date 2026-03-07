import { Ionicons } from "@expo/vector-icons";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function DrawerMenu({ slideAnim, closeMenu, locations }: any) {
  const insets = useSafeAreaInsets();

  return (
    <Pressable
      style={[
        styles.overlay,
        {
          top: insets.top,
          bottom: insets.bottom,
        },
      ]}
      onPress={closeMenu}
    >
      <Animated.View
        style={[styles.drawer, { transform: [{ translateX: slideAnim }] }]}
      >
        {/* current location */}
        <View style={styles.row}>
          <View style={styles.left}>
            <Ionicons name="location-outline" size={18} color="#fff" />
            <Text style={styles.title}>Vị trí hiện tại</Text>
          </View>
        </View>

        {/* render location list */}
        {locations.map((item: any, index: number) => (
          <View key={index} style={styles.row}>
            <View style={styles.left}>
              <Ionicons name="location-outline" size={18} color="#fff" />
              <Text style={styles.city}>{item.name}</Text>
            </View>

            <View style={styles.right}>
              <Ionicons name="moon" size={18} color="#FFD54F" />
              <Text style={styles.temp}>{item.temp}°</Text>
            </View>
          </View>
        ))}

        <View style={styles.divider} />

        <View style={styles.row}>
          <View style={styles.left}>
            <Ionicons name="add-circle-outline" size={18} color="#fff" />
            <Text style={styles.title}>Vị trí khác</Text>
          </View>
        </View>

        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Quản lý vị trí</Text>
        </Pressable>
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
    width: 300,
    height: "100%",
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: "#6D6AA8",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  title: {
    color: "#ddd",
    fontSize: 16,
  },

  city: {
    color: "#fff",
    fontSize: 18,
  },

  temp: {
    color: "#fff",
    fontSize: 18,
  },

  divider: {
    borderBottomWidth: 1,
    borderStyle: "dotted",
    borderColor: "#ddd",
    marginVertical: 10,
  },

  button: {
    marginTop: 30,
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
