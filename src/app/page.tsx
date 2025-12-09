// "use client";
// import HexGrid from "../components/HexGrid";
// import Sidebar from "../components/sidebar";
// import "../styles/hexagon.css";

// export default function Home() {
//   return (
//     <div className="w-full h-screen bg-gray-200 overflow-hidden relative mt-3">
       
//       <HexGrid />
//       <Sidebar />

//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import HexGrid from "@/components/HexGrid";
import Sidebar from "@/components/sidebar";
import { getModules } from "@/lib/fakeApi";
import { ModuleItem } from "@/types/module";

export default function Home() {
  const [modules, setModules] = useState<ModuleItem[]>([]);

  useEffect(() => {
    getModules().then((data) => setModules(data));
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-gray-100">
      {/* Hex Grid */}
      {modules.length > 0 ? (
        <HexGrid modules={modules} />
      ) : (
        <div className="flex items-center justify-center h-screen text-gray-500">
          Loading modules...
        </div>
      )}

      {/* Sidebar */}
      <Sidebar />
    </div>
  );
}
