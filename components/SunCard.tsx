import { Dimensions, StyleSheet, Text, View } from "react-native";
import Svg, { Circle, Line, Path } from "react-native-svg";

const width = Dimensions.get("window").width - 70;
const height = 90;
const horizonY = 80;
const amplitude = 55;

function formatTime(d: Date) {
  return d.toTimeString().slice(0, 5);
}

function dayLengthText(ms: number) {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  return `${h} giờ ${m} phút`;
}

export default function SunCard({ weather }: any) {
  if (!weather) return null;

  const sunrise = new Date(weather.daily.sunrise[0]);
  const sunset = new Date(weather.daily.sunset[0]);

  const sunriseText = formatTime(sunrise);
  const sunsetText = formatTime(sunset);

  const now = new Date();

  const dayMs = sunset.getTime() - sunrise.getTime();

  const progress = (now.getTime() - sunrise.getTime()) / dayMs;
  const safeProgress = Math.max(0, Math.min(1, progress));

  const sunX = width * safeProgress;
  const sunY = horizonY - Math.sin(safeProgress * Math.PI) * amplitude;

  const solarNoon = new Date(sunrise.getTime() + dayMs / 2);
  const solarNoonText = formatTime(solarNoon);

  const remainingMs = sunset.getTime() - now.getTime();

  const path = `M0 ${horizonY}
    Q ${width / 4} ${horizonY - amplitude}
    ${width / 2} ${horizonY - amplitude}
    T ${width} ${horizonY}`;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Bình minh và hoàng hôn</Text>

      {/* Top time */}
      <View style={styles.topRow}>
        <View>
          <Text style={styles.label}>Bình minh</Text>
          <Text style={styles.time}>{sunriseText}</Text>
        </View>

        <View>
          <Text style={styles.label}>Hoàng hôn</Text>
          <Text style={styles.time}>{sunsetText}</Text>
        </View>
      </View>

      {/* Sun path */}
      <Svg width={width} height={height}>
        {/* Horizon */}
        <Line
          x1="0"
          y1={horizonY}
          x2={width}
          y2={horizonY}
          stroke="#cfcfcf"
          strokeWidth="2"
        />

        {/* Orbit */}
        <Path d={path} stroke="#cfcfcf" strokeWidth="2" fill="none" />

        {/* Daylight area */}
        <Path
          d={`M0 ${horizonY}
              Q ${sunX / 2} ${horizonY - amplitude * safeProgress}
              ${sunX} ${sunY}
              L ${sunX} ${horizonY}
              Z`}
          fill="#F6C76E"
          opacity="0.6"
        />

        {/* Sun */}
        <Circle
          cx={sunX}
          cy={sunY}
          r="9"
          fill="#FFD54F"
          stroke="#fff"
          strokeWidth="2"
        />
      </Svg>

      {/* Bottom info */}
      <View style={styles.bottomRow}>
        <View style={styles.bottomItem}>
          <Text style={styles.bottomLabel}>Lúc bình minh</Text>
          <Text style={styles.bottomValue}>{sunriseText}</Text>
        </View>

        <View style={styles.bottomItem}>
          <Text style={styles.bottomLabel}>Ban ngày</Text>
          <Text style={styles.bottomValue}>{solarNoonText}</Text>
        </View>

        <View style={styles.bottomItem}>
          <Text style={styles.bottomLabel}>Trời tối</Text>
          <Text style={styles.bottomValue}>{sunsetText}</Text>
        </View>
      </View>

      <Text style={styles.info}>Độ dài của ngày {dayLengthText(dayMs)}</Text>

      {remainingMs > 0 && (
        <Text style={styles.info}>
          Thời gian sáng còn lại {dayLengthText(remainingMs)}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
  },

  title: {
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 14,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  label: {
    color: "#888",
    fontSize: 13,
  },

  time: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 2,
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
  },

  bottomItem: {
    alignItems: "center",
  },

  bottomLabel: {
    color: "#777",
    fontSize: 12,
  },

  bottomValue: {
    fontWeight: "700",
    marginTop: 2,
  },

  info: {
    marginTop: 8,
    color: "#444",
    fontSize: 13,
  },
});
