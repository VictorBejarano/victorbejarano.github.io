import { createReducer, on } from '@ngrx/store';
import * as PortfolioActions from './portfolio.actions';
import { Profile } from '../../domain/models/profile.model';
import { Study } from '../../domain/models/study.model';
import { Experience } from '../../domain/models/experience.model';
import { Project } from '../../domain/models/project.model';

export interface PortfolioState {
  profile: Profile | null;
  studies: Study[];
  experience: Experience[];
  projects: Project[];
  loading: boolean;
  error: any;
  isDarkMode: boolean;
  language: string;
}

export const initialState: PortfolioState = {
  profile: null,
  studies: [],
  experience: [],
  projects: [],
  loading: false,
  error: null,
  isDarkMode: true,
  language: 'es'
};

export const portfolioReducer = createReducer(
  initialState,
  on(PortfolioActions.loadPortfolioData, state => ({ ...state, loading: true })),
  on(PortfolioActions.loadPortfolioDataSuccess, (state, { profile, studies, experience, projects }) => ({
    ...state,
    profile,
    studies,
    experience,
    projects,
    loading: false
  })),
  on(PortfolioActions.loadPortfolioDataFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  on(PortfolioActions.toggleTheme, state => ({ ...state, isDarkMode: !state.isDarkMode })),
  on(PortfolioActions.setLanguage, (state, { language }) => ({ ...state, language }))
);
