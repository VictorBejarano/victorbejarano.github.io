export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
  technologies: string[];
  repoUrl?: string;
  liveUrl?: string;
}
