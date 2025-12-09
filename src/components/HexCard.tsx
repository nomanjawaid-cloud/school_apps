"use client";

import { ModuleItem } from "@/types/module";
import { FiEdit, FiTrash } from "react-icons/fi";
import { HexStyle } from "./HexSize";
import { useUiStore } from "@/store/useUiStore";

type HexSize = "small" | "medium" | "large" | "center";

interface HexCardProps {
  item: ModuleItem;
  size?: HexSize;
  index?: number;
  onClick?: (index?: number) => void;
  onEdit?: (item: ModuleItem) => void;
  onDelete?: (item: ModuleItem) => void;
}

export default function HexCard({
  item,
  size = "small",
  index,
  onClick,
  onEdit,
  onDelete,
}: HexCardProps) {
  const setExpanded = useUiStore((s: any) => s.setExpanded);

  const handleClick = () => {
    if (size === "center") {
      setExpanded(true);
      onClick?.(index);
    } else {
      onClick?.(index);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`
        relative group z-10
        ${HexStyle({ size })}
        flex flex-col items-center justify-center
        text-center shadow-2xl border-4 border-white/20
        cursor-pointer select-none
        hover:scale-105 active:scale-95
        transition-all duration-500 ease-out
        [clip-path:polygon(30%_0%,70%_0%,100%_30%,100%_70%,70%_100%,30%_100%,0%_70%,0%_30%)]
        ${size !== "center" ? "self-start mr-auto ml-4" : ""}
      `}
    >
      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 z-50 transition-opacity duration-300">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit?.(item);
          }}
          className="p-1 bg-orange-200 rounded-full shadow hover:bg-gray-100"
        >
          <FiEdit size={18} color="#2563eb" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.(item);
          }}
          className="p-1 bg-white rounded-full shadow hover:bg-gray-100"
        >
          <FiTrash size={18} color="#dc2626" />
        </button>
      </div>

      <h3 className="font-black text-blue-700 leading-tight drop-shadow-md">
        {item.title}
      </h3>
      <p className="text-black leading-snug px-4">{item.subtitle}</p>
    </div>
  );
}
