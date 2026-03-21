export interface Study {
  id: string;
  type: 'professional' | 'extra';
  institution: string;
  degreeOrCourse: string;
  startDate: string;
  endDate?: string;
  description?: string;
}
