export interface ModuleItem {
  id: number;
  title: string;
  subtitle: string;
  exp: number;
  outcomes: number;
  status: string;
  description: string;
   category: string,
  position: {
    x: number;
    y: number;
  };
}
