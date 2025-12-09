export interface ModuleItem {
  id: number;
  title: string;
  subtitle: string;
  exp: number;
outcomes?: number[];
  status: string;
  description: string;
   category: string,
   icon?: string;
   color?: string;
  position: {
    x: number;
    y: number;
  };
}


// export async function getModules(): Promise<ModuleItem[]> {
//   return [
//     {
//       id: 1,
//       title: "Mission",
//       subtitle: "Our Mission",
//       exp: 0,
//       status: "active",        // add default
//       description: "",         // add default
//       category: "general",     // add default
//       position: 1,             // required by your type
//     },
//     {
//       id: 2,
//       title: "Vision",
//       subtitle: "Our Vision",
//       exp: 0,
//       status: "active",
//       description: "",
//       category: "general",
//       position: 2,
//     }
//   ];
// }
