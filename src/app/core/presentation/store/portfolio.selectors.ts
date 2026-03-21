import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PortfolioState } from './portfolio.reducer';

export const selectPortfolioState = createFeatureSelector<PortfolioState>('portfolio');

export const selectProfile = createSelector(selectPortfolioState, state => state.profile);
export const selectStudies = createSelector(selectPortfolioState, state => state.studies);
export const selectExperience = createSelector(selectPortfolioState, state => state.experience);
export const selectProjects = createSelector(selectPortfolioState, state => state.projects);
export const selectIsLoading = createSelector(selectPortfolioState, state => state.loading);
export const selectIsDarkMode = createSelector(selectPortfolioState, state => state.isDarkMode);
export const selectLanguage = createSelector(selectPortfolioState, state => state.language);
