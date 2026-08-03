import { Circle, G, Path, Svg } from "@react-pdf/renderer";

export default function AmountIcon() {
  return (
    <Svg width={42} height={42} viewBox="0 0 42 42">
      <Circle
        cx="21"
        cy="21"
        r="20"
        stroke="#2E9E45"
        strokeWidth="2"
        fill="white"
      />

      <Path d="M14 11h10l4 4v16H14z" fill="#2E9E45" />

      <Path d="M24 11v4h4" fill="white" />

      <Path
        d="M18 22
           c0-2 2-3 4-3
           s4 1 4 3
           s-2 3-4 3
           s-4 1-4 3
           s2 3 4 3
           s4-1 4-3"
        stroke="white"
        strokeWidth="1.4"
        fill="none"
      />
    </Svg>
  );
}
