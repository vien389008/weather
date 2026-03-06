import Svg, { ClipPath, Defs, Path, Rect } from "react-native-svg";

export default function HumidityDrop({ percent = 50, size = 24 }) {
  const fillHeight = (percent / 100) * size;

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Defs>
        <ClipPath id="clip">
          <Path d="M12 2C12 2 5 10 5 15a7 7 0 0014 0c0-5-7-13-7-13z" />
        </ClipPath>
      </Defs>

      {/* Background drop */}
      <Path d="M12 2C12 2 5 10 5 15a7 7 0 0014 0c0-5-7-13-7-13z" fill="#ddd" />

      {/* Water fill */}
      <Rect
        x="0"
        y={size - fillHeight}
        width={size}
        height={fillHeight}
        fill="#3fa9f5"
        clipPath="url(#clip)"
      />
    </Svg>
  );
}
