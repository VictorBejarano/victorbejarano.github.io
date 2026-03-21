import { Observable } from 'rxjs';
import { Profile } from '../models/profile.model';
import { Study } from '../models/study.model';
import { Experience } from '../models/experience.model';
import { Project } from '../models/project.model';

export abstract class PortfolioRepository {
  abstract getProfile(lang: string): Observable<Profile>;
  abstract getStudies(lang: string): Observable<Study[]>;
  abstract getExperience(lang: string): Observable<Experience[]>;
  abstract getProjects(lang: string): Observable<Project[]>;
}
