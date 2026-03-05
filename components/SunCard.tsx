import { Dimensions, StyleSheet, Text, View } from "react-native";
import Svg, { Circle, Line, Path, Rect } from "react-native-svg";

const width = Dimensions.get("window").width - 60;
const height = 86;
const horizonY = 80; // đường chân trời
const amplitude = 55; // độ cao quỹ đạo

function formatTime(d: Date) {
  return d.toTimeString().slice(0, 5);
}

function dayLengthText(ms: number) {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  return `${h}giờ ${m}phút`;
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

      {/* Top times */}
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

      <Svg width={width} height={height}>
        {/* Night background */}
        <Rect x="0" y={horizonY} width={width} height={2} fill="#bbb" />

        {/* Daylight triangle */}
        <Path
          d={`M0 ${horizonY}
              L ${sunX} ${horizonY}
              L ${sunX} ${sunY}
              Z`}
          fill="#f6c76e"
          opacity="0.7"
        />

        {/* Horizon */}
        <Line
          x1="0"
          y1={horizonY}
          x2={width}
          y2={horizonY}
          stroke="#bbb"
          strokeWidth="1"
        />

        {/* Sun orbit */}
        <Path d={path} stroke="#bdbdbd" strokeWidth="2" fill="none" />

        {/* Sun */}
        <Circle cx={sunX} cy={sunY} r="10" fill="#FFD54F" />
      </Svg>

      {/* Bottom info */}
      <View style={styles.bottomRow}>
        <View>
          <Text style={styles.bottomLabel}>Lúc bình minh</Text>
          <Text style={styles.bottomValue}>{sunriseText}</Text>
        </View>

        <View>
          <Text style={styles.bottomLabel}>Ban ngày</Text>
          <Text style={styles.bottomValue}>{solarNoonText}</Text>
        </View>

        <View>
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
    padding: 15,
    marginTop: 15,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  label: {
    color: "#888",
  },

  time: {
    fontSize: 20,
    fontWeight: "bold",
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  bottomLabel: {
    color: "#666",
  },

  bottomValue: {
    fontWeight: "bold",
  },

  info: {
    marginTop: 8,
    color: "#444",
  },
});
