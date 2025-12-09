type HexSizeType = "small" | "medium" | "large" | "center";

interface HexStyleProps {
  size: HexSizeType;
}

export const sizeStyles: Record<HexSizeType, string> = {
  small: "w-[120px] h-[120px] text-xs",
  medium: "w-[200px] h-[200px] text-sm",
  large: "w-[320px] h-[260px] text-lg",
  center: "w-[360px] h-[320px] text-xl",
};

export const bgStyles: Record<HexSizeType, string> = {
  small: "from-blue-200 to-blue-600",
  medium: "from-red-200 to-red-400",
  large: "from-purple-600 to-pink-600",
  center: "bg-blue-200",
};

export function HexStyle({ size }: HexStyleProps) {
  return `${sizeStyles[size]} bg-gradient-to-br ${bgStyles[size]}`;
}
