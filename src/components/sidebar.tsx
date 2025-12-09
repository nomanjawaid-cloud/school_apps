"use client";

import { useUiStore } from "../store/useUiStore";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const { sidebarOpen, selectedItem, closeSidebar } = useUiStore();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`
        fixed top-20 right-10 
        w-[480px] h-[480px] flex flex-col items-center justify-center mt-10
        transform-gpu origin-[75%_50%] bg-linear-to-br from-blue-200 to-blue-200 shadow-2xl p-6
        [clip-path:polygon(30%_0%,70%_0%,100%_30%,100%_70%,70%_100%,30%_100%,0%_70%,0%_30%)]

        transition-all duration-500 ease-out
        ${
          sidebarOpen
            ? "opacity-100 scale-100 translate-x-0 rotate-0"
            : "opacity-0 scale-90 -translate-x-10 -rotate-6"
        }`}
    >
      {/* Close Button */}
      <button
        onClick={closeSidebar}
        className="absolute top-4 right-4 text-xl font-bold bg-red-300 text-black rounded-full 
                   w-8 h-8 mr-30 flex items-center justify-center hover:bg-gray-300 transition-colors"
      >
        <X size={20} />
      </button>

      {/* Content */}
      {selectedItem && (
        <div
          className={`
            text-black mt-10 p-4 rounded-xl shadow-lg 
            w-[75%] h-[65%] overflow-y-auto bg-white/40 backdrop-blur-sm
            transition-all duration-500
            ${
              sidebarOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-5"
            }
          `}
        >
          <h2 className="text-xl font-bold text-purple-700 text-center">
            {selectedItem.title}
          </h2>

          <p className="text-gray-500 text-center">{selectedItem.subtitle}</p>
            <div className="mt-4 space-y-2 text-sm">
            <p><strong>Description:</strong> {selectedItem.description}</p>
            <p><strong>Experience:</strong> {selectedItem.exp}</p>
            <p><strong>Outcomes:</strong> {selectedItem.outcomes}</p>
            <p><strong>Status:</strong> {selectedItem.status}</p>
          </div>
        </div>
      )}
    </div>
  );
}
