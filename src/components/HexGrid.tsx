"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import HexCard from "./HexCard";
import { ModuleItem } from "@/types/module";
import { useUiStore } from "@/store/useUiStore";
import { GiHexes } from "react-icons/gi";
import { FiGrid } from "react-icons/fi";

interface HexPosition {
  id: number;
  x: number;
  y: number;
  size: "small" | "medium" | "large" | "center";
}

const SNAP_DISTANCE = 120;
const CENTER_RADIUS = 200;
const HEX_SIZE_SMALL = 120;
const HEX_SIZE_CENTER = 300;

const savePositions = (positions: HexPosition[]): void => {
  localStorage.setItem("hexPositions", JSON.stringify(positions));
};

const loadPositions = (): HexPosition[] | null => {
  const saved = localStorage.getItem("hexPositions");
  return saved ? JSON.parse(saved) : null;
};

// Create 14 hexagons (1 center + 13 small)
const createFourteenHexLayout = (): HexPosition[] => {
  const positions: HexPosition[] = [];

  // Center hexagon (larger size)
  positions.push({
    id: 1,
    x: 0,
    y: 0,
    size: "center",
  });

  // Create 13 small hexagons around center in two circles
  const innerCircleRadius = CENTER_RADIUS;
  const outerCircleRadius = CENTER_RADIUS * 1.8;

  // First circle - 6 hexagons
  for (let i = 0; i < 6; i++) {
    const angle = (i * 60 * Math.PI) / 180;
    const x = innerCircleRadius * Math.cos(angle);
    const y = innerCircleRadius * Math.sin(angle);

    positions.push({
      id: i + 2,
      x,
      y,
      size: "small",
    });
  }

  // Second circle - 7 hexagons (one extra)
  for (let i = 0; i < 7; i++) {
    const angle = ((i * 51.43 + 25.71) * Math.PI) / 180;
    const x = outerCircleRadius * Math.cos(angle);
    const y = outerCircleRadius * Math.sin(angle);

    positions.push({
      id: i + 8,
      x,
      y,
      size: "small",
    });
  }

  return positions;
};

interface HexGridProps {
  modules: ModuleItem[];
}

export default function HexGrid({ modules }: HexGridProps) {
  if (!modules || !Array.isArray(modules)) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-100">
        <div className="text-gray-600">No modules available</div>
      </div>
    );
  }

  // Ensure we have at least 14 modules
  const extendedModules: ModuleItem[] = [...modules];
  while (extendedModules.length < 14) {
    extendedModules.push({
      id: extendedModules.length + 1,
      title: `Module ${extendedModules.length + 1}`,
      subtitle: "Additional module",
      exp: 0,
      outcomes: [],
      status: "inactive",
      description: "",
      icon: "",
      color: "",
      category: "",
      position: { x: 0, y: 0 },
    });
  }

  const openSidebar = useUiStore((s) => s.openSidebar);
  const containerRef = useRef<HTMLDivElement>(null);

  // State for showing small grid
  const [showSmallGrid, setShowSmallGrid] = useState<boolean>(false);
  const [gridAnimation, setGridAnimation] = useState<string>("hidden");

  // Create initial layout for 14 hexagons
  const initialLayout = createFourteenHexLayout();

  const [positions, setPositions] = useState<HexPosition[]>(() => {
    const saved = loadPositions();
    if (saved && saved.length === 14) {
      return saved;
    }
    return initialLayout;
  });

  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [isSwapping, setIsSwapping] = useState<boolean>(false);
  const [containerSize, setContainerSize] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  // Handle center hex click
  const handleCenterClick = useCallback(() => {
    if (!showSmallGrid) {
      setShowSmallGrid(true);
      setGridAnimation("expanding");
      setTimeout(() => setGridAnimation("visible"), 300);
    } else {
      setGridAnimation("collapsing");
      setTimeout(() => {
        setShowSmallGrid(false);
        setGridAnimation("hidden");
      }, 300);
    }
  }, [showSmallGrid]);

  // Update container size and center hexagons
  useEffect(() => {
    const updateSize = (): void => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setContainerSize({ width, height });

        // Center hexagons in container
        const centerX = width / 2;
        const centerY = height / 2;

        setPositions((prev) => {
          const saved = loadPositions();
          if (saved && saved.length === 14) return saved;

          const centerHexIndex = prev.findIndex((p) => p.size === "center");

          if (centerHexIndex !== -1) {
            const updated = [...prev];

            // Position center hex at exact center
            updated[centerHexIndex] = {
              ...updated[centerHexIndex],
              x: centerX - HEX_SIZE_CENTER / 2,
              y: centerY - HEX_SIZE_CENTER / 2,
            };

            // Position other hexagons relative to center
            return updated.map((pos, i) => {
              if (i === centerHexIndex) return pos;

              const newX = centerX + pos.x - HEX_SIZE_SMALL / 2;
              const newY = centerY + pos.y - HEX_SIZE_SMALL / 2;

              return {
                ...pos,
                x: Math.max(30, Math.min(newX, width - HEX_SIZE_SMALL - 30)),
                y: Math.max(30, Math.min(newY, height - HEX_SIZE_SMALL - 30)),
              };
            });
          }

          return prev;
        });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const handleMouseDown = useCallback(
    (index: number, e: React.MouseEvent) => {
      if (positions[index].size === "center" || !showSmallGrid) return;
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      setDraggingIndex(index);
      setDragOffset({
        x: e.clientX - containerRect.left - positions[index].x,
        y: e.clientY - containerRect.top - positions[index].y,
      });
    },
    [positions, showSmallGrid]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (draggingIndex === null || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();

      setPositions((prev) => {
        const newPos = [...prev];
        const newX = e.clientX - containerRect.left - dragOffset.x;
        const newY = e.clientY - containerRect.top - dragOffset.y;

        // Keep hex within container bounds with padding
        const paddedWidth = containerRect.width - HEX_SIZE_SMALL - 30;
        const paddedHeight = containerRect.height - HEX_SIZE_SMALL - 30;

        newPos[draggingIndex] = {
          ...newPos[draggingIndex],
          x: Math.max(30, Math.min(newX, paddedWidth)),
          y: Math.max(30, Math.min(newY, paddedHeight)),
        };

        return newPos;
      });
    },
    [draggingIndex, dragOffset]
  );

  const handleMouseUp = useCallback(() => {
    if (draggingIndex !== null) {
      setPositions((prev) => {
        const newPos = [...prev];
        const draggedHex = newPos[draggingIndex];
        let targetIndex = -1;
        let minDistance = SNAP_DISTANCE;

        for (let i = 0; i < newPos.length; i++) {
          if (i === draggingIndex || newPos[i].size === "center") continue;

          const other = newPos[i];
          const dx = draggedHex.x - other.x;
          const dy = draggedHex.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < minDistance) {
            minDistance = distance;
            targetIndex = i;
          }
        }

        if (targetIndex !== -1) {
          setIsSwapping(true);

          const targetX = newPos[targetIndex].x;
          const targetY = newPos[targetIndex].y;

          newPos[targetIndex] = {
            ...newPos[targetIndex],
            x: draggedHex.x,
            y: draggedHex.y,
          };

          newPos[draggingIndex] = {
            ...draggedHex,
            x: targetX,
            y: targetY,
          };

          setTimeout(() => setIsSwapping(false), 300);
        }

        savePositions(newPos);
        return newPos;
      });
    }
    setDraggingIndex(null);
  }, [draggingIndex]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => handleMouseMove(e);
    const handleUp = () => handleMouseUp();

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const drawConnectionLines = useCallback(() => {
    if (!showSmallGrid) return null;

    const centerHexIndex = positions.findIndex((p) => p.size === "center");
    if (centerHexIndex === -1) return null;

    const centerHex = positions[centerHexIndex];
    const lines: Array<{
      x1: number;
      y1: number;
      x2: number;
      y2: number;
    }> = [];

    for (let i = 0; i < positions.length; i++) {
      if (i === centerHexIndex) continue;

      const hex = positions[i];
      lines.push({
        x1: centerHex.x + HEX_SIZE_CENTER / 2,
        y1: centerHex.y + HEX_SIZE_CENTER / 2,
        x2: hex.x + HEX_SIZE_SMALL / 2,
        y2: hex.y + HEX_SIZE_SMALL / 2,
      });
    }

    return lines;
  }, [positions, showSmallGrid]);

  const connectionLines = drawConnectionLines();

  // Get animation class based on grid state
  const getAnimationClass = (): string => {
    switch (gridAnimation) {
      case "expanding":
        return "scale-0 animate-expandHex";
      case "collapsing":
        return "scale-100 animate-collapseHex";
      default:
        return showSmallGrid ? "scale-100" : "scale-0";
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-linear-to-br from-blue-50 to-blue-100"
    >
      {/* Connection lines */}
      {connectionLines && showSmallGrid && (
        <svg className="pointer-events-none absolute inset-0">
          {connectionLines.map((line, index) => (
            <line
              key={index}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="rgba(59, 130, 246, 0.3)"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
          ))}
        </svg>
      )}

      {/* Grid background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, #60a5fa 1px, transparent 1px),
              linear-gradient(to bottom, #60a5fa 1px, transparent 1px)
            `,
            backgroundSize: "60px 52px",
          }}
        />
      </div>

      {/* Small hexagons */}
      {positions.slice(1).map((pos, i) => {
        const actualIndex = i + 1;
        const isDragging = draggingIndex === actualIndex;
        const module = extendedModules[actualIndex] || {
          id: actualIndex + 1,
          title: `Hex ${actualIndex + 1}`,
          subtitle: "Module",
        };

        const animationClass = getAnimationClass();

        return (
          <div
            key={pos.id}
            className={`absolute transition-all duration-300 hover:z-40 
              ${animationClass}
              ${
                showSmallGrid
                  ? "cursor-grab active:cursor-grabbing"
                  : "cursor-default pointer-events-none"
              }
              ${isDragging ? "z-50" : "z-20"}`}
            style={{
              left: `${pos.x}px`,
              top: `${pos.y}px`,
              transform: `translate(0, 0) scale(${isDragging ? 1.1 : 1})`,
              transition: isSwapping
                ? "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                : isDragging
                ? "transform 0.1s ease"
                : showSmallGrid
                ? "all 0.5s ease-out"
                : "none",
              filter: isDragging
                ? "drop-shadow(0 10px 20px rgba(0, 0, 0, 0.4))"
                : "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))",
            }}
            onMouseDown={(e) => handleMouseDown(actualIndex, e)}
          >
            <HexCard
              item={module}
              size={pos.size}
              onClick={() => openSidebar(module)}
            />

            {isDragging && (
              <div className="pointer-events-none absolute -inset-2 animate-pulse rounded-lg border-2 border-dashed border-blue-500" />
            )}
          </div>
        );
      })}

      {/* Center hexagon with button (color not changed) */}
      {positions[0] && (
        <div
          className="group absolute z-30 transition-all duration-500 hover:z-40"
          style={{
            left: `${positions[0].x}px`,
            top: `${positions[0].y}px`,
            filter: "drop-shadow(0 8px 16px rgba(59, 130, 246, 0.6))",
          }}
        >
          {/* Original center hexagon (color not changed) */}
          <div className="relative">
            <HexCard
              item={
                extendedModules[0] || {
                  id: 1,
                  title: "Hex Grid",
                  subtitle: "Center Module",
                }
              }
              size="center"
              onClick={() => openSidebar(extendedModules[0])}
            />

            {/* Toggle grid button - Added on top of center hex */}
            <button
              onClick={handleCenterClick}
              className="group/btn absolute -right-4 -top-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-r from-blue-600 to-blue-700 shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-95"
              aria-label={showSmallGrid ? "Hide grid" : "Show grid"}
              title={showSmallGrid ? "Hide grid" : "Show grid"}
            >
              <div className="relative">
                <div
                  className={`text-white transition-all duration-300 ${
                    showSmallGrid ? "rotate-180 scale-110" : ""
                  }`}
                >
                  <FiGrid size={22} />
                </div>

                {/* Animation dots when grid is visible */}
                {showSmallGrid && (
                  <div className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 gap-0.5">
                    <div className="h-1 w-1 animate-pulse rounded-full bg-white"></div>
                    <div
                      className="h-1 w-1 animate-pulse rounded-full bg-white"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="h-1 w-1 animate-pulse rounded-full bg-white"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                )}
              </div>

              {/* Tooltip on hover */}
              <div className="absolute -top-10 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-gray-800 px-3 py-1 text-xs text-white opacity-0 transition-opacity group-hover/btn:block group-hover/btn:opacity-100">
                {showSmallGrid ? "Hide Grid" : "Show Grid"}
              </div>
            </button>
          </div>
        </div>
      )}

      {/* No instructions at the bottom - Removed as requested */}

      {/* Tailwind animation classes */}
      <style jsx>{`
        @keyframes expandHex {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          60% {
            transform: scale(1.1) rotate(5deg);
            opacity: 0.8;
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        @keyframes collapseHex {
          0% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
          40% {
            transform: scale(1.1) rotate(-5deg);
            opacity: 0.8;
          }
          100% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
        }

        .animate-expandHex {
          animation: expandHex 0.5s ease-out forwards;
        }

        .animate-collapseHex {
          animation: collapseHex 0.5s ease-in forwards;
        }
      `}</style>
    </div>
  );
}
