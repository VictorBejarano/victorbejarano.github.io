import { Observable } from 'rxjs';
import { Profile } from '../models/profile.model';
import { Study } from '../models/study.model';
import { Experience } from '../models/experience.model';
import { Project } from '../models/project.model';

export abstract class PortfolioRepository {
  abstract getProfile(): Observable<Profile>;
  abstract getStudies(): Observable<Study[]>;
  abstract getExperience(): Observable<Experience[]>;
  abstract getProjects(): Observable<Project[]>;
}
