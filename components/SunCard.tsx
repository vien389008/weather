import { Dimensions, StyleSheet, Text, View } from "react-native";
import Svg, {
  Circle,
  ClipPath,
  Defs,
  Line,
  Path,
  Rect,
} from "react-native-svg";

const width = Dimensions.get("window").width - 70;
const height = 110;
const horizonY = 90;
const amplitude = 90;
const sunRadius = 10;

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

  const sunX = sunRadius + (width - sunRadius * 2) * safeProgress;

  const sunY = horizonY - Math.sin(safeProgress * Math.PI) * amplitude;

  const solarNoon = new Date(sunrise.getTime() + dayMs / 2);
  const solarNoonText = formatTime(solarNoon);

  const remainingMs = sunset.getTime() - now.getTime();

  const arcPath = `M0 ${horizonY}
  Q ${width / 2} ${horizonY - amplitude}
  ${width} ${horizonY}`;

  const fillPath = `M0 ${horizonY}
  Q ${width / 2} ${horizonY - amplitude}
  ${width} ${horizonY}
  L ${width} ${horizonY}
  L 0 ${horizonY}
  Z`;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Bình minh và hoàng hôn</Text>

      {/* top time */}
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
        {/* horizon */}
        <Line
          x1="0"
          y1={horizonY}
          x2={width}
          y2={horizonY}
          stroke="#d8d8d8"
          strokeWidth="2"
        />

        {/* clip để fill tới vị trí mặt trời */}
        <Defs>
          <ClipPath id="sunClip">
            <Rect x="0" y="0" width={sunX} height={height} />
          </ClipPath>
        </Defs>

        {/* daylight fill */}
        <Path
          d={fillPath}
          fill="#F6C76E"
          opacity="0.65"
          clipPath="url(#sunClip)"
        />

        {/* sun orbit */}
        <Path d={arcPath} stroke="#d0d0d0" strokeWidth="2" fill="none" />

        {/* sun */}
        <Circle
          cx={sunX}
          cy={sunY}
          r={sunRadius}
          fill="#FFD54F"
          stroke="#fff"
          strokeWidth="3"
        />
      </Svg>

      {/* bottom info */}
      <View style={styles.bottomRow}>
        <View style={styles.bottomItem}>
          <Text style={styles.bottomLabel}>Thời điểm giữa trưa</Text>
          <Text style={styles.bottomValue}>{solarNoonText}</Text>
        </View>
      </View>

      <Text style={styles.info}>Độ dài của ngày {dayLengthText(dayMs)}</Text>

      {remainingMs > 0 ? (
        <Text style={styles.info}>
          Thời gian sáng còn lại {dayLengthText(remainingMs)}
        </Text>
      ) : (
        <Text style={styles.info}>Mặt trời đã lặn</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 18,
  },

  title: {
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 16,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  label: {
    color: "#888",
    fontSize: 12,
  },

  time: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 2,
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "center",
  },

  bottomItem: {
    alignItems: "center",
  },

  bottomLabel: {
    color: "#888",
    fontSize: 12,
  },

  bottomValue: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 3,
  },

  info: {
    marginTop: 10,
    color: "#444",
    fontSize: 13,
  },
});
