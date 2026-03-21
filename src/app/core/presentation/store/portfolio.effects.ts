import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, forkJoin } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as PortfolioActions from './portfolio.actions';
import { PortfolioRepository } from '../../domain/repositories/portfolio.repository';

@Injectable()
export class PortfolioEffects {
  private actions$ = inject(Actions);
  private portfolioRepo = inject(PortfolioRepository);

  loadPortfolioData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PortfolioActions.loadPortfolioData),
      mergeMap(() =>
        forkJoin({
          profile: this.portfolioRepo.getProfile(),
          studies: this.portfolioRepo.getStudies(),
          experience: this.portfolioRepo.getExperience(),
          projects: this.portfolioRepo.getProjects()
        }).pipe(
          map(data => PortfolioActions.loadPortfolioDataSuccess(data)),
          catchError(error => of(PortfolioActions.loadPortfolioDataFailure({ error })))
        )
      )
    )
  );
}
