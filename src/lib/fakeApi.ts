import { ModuleItem } from "@/types/module";

export async function getModules(): Promise<ModuleItem[]> {
  return [
    {
      id: 1,
      title: "Mission",
      subtitle:
        "Define the mission and contextual framework of the educational institution",
    },
    {
      id: 2,
      title: "Super Maker",
      subtitle: "Hands-on learning, creativity, collaboration",
    },
    { id: 3, title: "Electives", subtitle: "STEM & Arts and Humanities" },
    { id: 4, title: "Boost", subtitle: "Support | Extra Help" },
    { id: 5, title: "COMP 3", subtitle: "Competence | Digital & AI Literacy" },
    { id: 6, title: "College Expo", subtitle: "Experience | Guidance" },
    { id: 7, title: "C.A.R.E.", subtitle: "Support & Wellbeing" },
    {
      id: 8,
      title: "Family Circle",
      subtitle: "Engagement, Family partnership",
    },
    { id: 9, title: "Science", subtitle: "Lab | Exploration | Projects" },
    { id: 10, title: "Math", subtitle: "Math mastery" },
    { id: 11, title: "COMP 3", subtitle: "Digital Literacy (Bottom)" },
    {
      id: 12,
      title: "Wayfinding & Cross Cutting Thinking",
      subtitle: "Navigation | Big picture",
    },
    { id: 13, title: "College Expo (Top)", subtitle: "Experience | Exposure" },
    {
      id: 14,
      title: "Student Wellbeing",
      subtitle: "Support structure for students",
    },
  ];
}
