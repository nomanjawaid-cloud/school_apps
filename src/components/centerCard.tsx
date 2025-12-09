// // components/CenterMissionCard.tsx
// "use client";

// import { ModuleItem } from "@/types/module";
// import { useUiStore } from "@/store/useUiStore";
// import Link from "next/link";

// interface Props {
//   item: ModuleItem;
//   isCenter?: boolean; // optional, default false
// }

// export default function CenterMissionCard({ item, isCenter = true }: Props) {
//   const openSidebar = useUiStore((s) => s.openSidebar);

//   return (
//     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
//       <div
//         className={`
//           ${isCenter ? "w-[280px] h-[320px]" : "w-[150px] h-[170px]"}
//           bg-gradient-to-br from-purple-600 via-pink-600 to-red-600
//           flex flex-col items-center justify-center text-center
//           shadow-2xl border-4 border-white/30
//           cursor-pointer
//           hover:scale-105 transition-all duration-500
//           [clip-path:polygon(30%_0%,70%_0%,100%_30%,100%_70%,70%_100%,30%_100%,0%_70%,0%_30%)]
//           select-none
//         `}
//         onClick={() => !isCenter && openSidebar(item)} // sirf chhote cards pe click work karega
//       >
//         {/* Title */}
//         <h1 className={`${isCenter ? "text-5xl" : "text-2xl"} font-black text-white drop-shadow-2xl`}>
//           {item.title}
//         </h1>

//         {/* Subtitle */}
//         <p className={`${isCenter ? "text-lg mt-4 px-10" : "text-xs mt-1"} text-white/90 max-w-[240px] leading-relaxed`}>
//           {item.subtitle}
//         </p>

//         {/* Buttons – Sirf Center Card mein dikhega */}
//         {isCenter && (
//           <div className="flex gap-5 mt-10">
//             {/* View Full Mission */}
//             <Link
//               href="/mission/full"
//               className="px-7 py-3 bg-white/25 backdrop-blur-md text-white font-bold rounded-full
//                        border border-white/40 hover:bg-white hover:text-purple-700
//                        transition-all duration-300 shadow-xl text-sm"
//               onClick={(e) => e.stopPropagation()} // card click na ho
//             >
//               View Full Mission
//             </Link>

//             {/* Edit Mission */}
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 openSidebar(item);
//               }}
//               className="px-7 py-3 bg-white text-purple-700 font-bold rounded-full
//                        hover:bg-purple-50 transition-all duration-300 shadow-xl text-sm"
//             >
//               Edit Mission
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
