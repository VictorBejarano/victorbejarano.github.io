export interface Profile {
  id: string;
  name: string;
  dynamicRole: string; // The dynamically changing role text
  professionalSummary: string;
  personalSummary: string;
  email: string;
  githubUrl?: string;
  linkedinUrl?: string;
}
