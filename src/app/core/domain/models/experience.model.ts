export interface Experience {
  id: string;
  companyName: string;
  role: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description: string; // Description of functions and achievements
  technologiesUsed?: string[];
}
