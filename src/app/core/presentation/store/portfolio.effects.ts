import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, forkJoin } from 'rxjs';
import { map, mergeMap, catchError, withLatestFrom } from 'rxjs/operators';
import * as PortfolioActions from './portfolio.actions';
import { PortfolioRepository } from '../../domain/repositories/portfolio.repository';
import { selectLanguage, selectIsDarkMode } from './portfolio.selectors';
import { tap } from 'rxjs/operators';

@Injectable()
export class PortfolioEffects {
  private actions$ = inject(Actions);
  private portfolioRepo = inject(PortfolioRepository);
  private store = inject(Store);

  loadPortfolioData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PortfolioActions.loadPortfolioData, PortfolioActions.setLanguage),
      withLatestFrom(this.store.select(selectLanguage)),
      mergeMap(([action, lang]) =>
        forkJoin({
          profile: this.portfolioRepo.getProfile(lang),
          studies: this.portfolioRepo.getStudies(lang),
          experience: this.portfolioRepo.getExperience(lang),
          projects: this.portfolioRepo.getProjects(lang)
        }).pipe(
          map(data => PortfolioActions.loadPortfolioDataSuccess(data)),
          catchError(error => of(PortfolioActions.loadPortfolioDataFailure({ error })))
        )
      )
    )
  );

  persistTheme$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PortfolioActions.toggleTheme),
      withLatestFrom(this.store.select(selectIsDarkMode)),
      tap(([_, isDarkMode]) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
        }
      })
    ), { dispatch: false }
  );

  persistLanguage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PortfolioActions.setLanguage),
      tap(({ language }) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('language', language);
        }
      })
    ), { dispatch: false }
  );
}
