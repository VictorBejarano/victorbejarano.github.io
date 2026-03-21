import { createAction, props } from '@ngrx/store';
import { Profile } from '../../domain/models/profile.model';
import { Study } from '../../domain/models/study.model';
import { Experience } from '../../domain/models/experience.model';
import { Project } from '../../domain/models/project.model';

export const loadPortfolioData = createAction('[Portfolio] Load Data');

export const loadPortfolioDataSuccess = createAction(
  '[Portfolio] Load Data Success',
  props<{ profile: Profile; studies: Study[]; experience: Experience[]; projects: Project[] }>()
);

export const loadPortfolioDataFailure = createAction(
  '[Portfolio] Load Data Failure',
  props<{ error: any }>()
);

export const toggleTheme = createAction('[Theme] Toggle Dark Mode');
export const setLanguage = createAction('[Lang] Set Language', props<{ language: string }>());
