// export default function generateHexPositions14() {
//   type HexSize = "small" | "medium" | "large" | "center";

//   const positions: { x: number; y: number; size: HexSize }[] = [];

//   const baseRadius = 390;
//   const verticalScale = 0.8;

//   // Center hexagon
//   positions.push({ x: 0, y: 0, size: "center" });

//   // Top-center small hexes
//   const topSmallRadius = baseRadius * 0.8;
//   const topSmallY = -topSmallRadius * verticalScale;
//   const topSmallXOffsets = [102, -10, -120];

//   topSmallXOffsets.forEach((xOffset) => {
//     positions.push({ x: xOffset, y: topSmallY, size: "small" });
//   });

//   // Top-middle medium hexes
//   const topMediumRadius = baseRadius * 0.8;
//   const topMediumY = -topMediumRadius * 0.6 * verticalScale;
//   const topMediumXOffset = topMediumRadius * 0.8;

//   positions.push({ x: -topMediumXOffset, y: topMediumY, size: "medium" });
//   positions.push({ x: topMediumXOffset, y: topMediumY, size: "medium" });

//   // Right-side small hexes in vertical layout

//   const rightAnglesDeg = [-292, -310, -328];

//   const rightRadius = -baseRadius * 0.9;

//   rightAnglesDeg.forEach((deg) => {
//     const rad = (deg * Math.PI) / 145;
//     positions.push({
//       x: rightRadius * Math.cos(rad),
//       y: rightRadius * Math.sin(rad) * verticalScale,
//       size: "small",
//     });
//   });

//   // Left-bottom hexes
//   const leftBottomAnglesDeg = [94, 140, 160, 180];
//   const leftBottomRadius = -baseRadius;
//   const leftBottomSizes: HexSize[] = ["medium", "small", "small", "small"];

//   leftBottomAnglesDeg.forEach((deg, i) => {
//     const rad = (deg * Math.PI) / -189;
//     positions.push({
//       x: leftBottomRadius * Math.cos(rad),
//       // y: leftBottomRadius * Math.sin(rad) * verticalScale,
//       y: leftBottomRadius * Math.sin(rad) * verticalScale + -50,

//       size: leftBottomSizes[i],
//     });
//   });

//   return positions;
// }



