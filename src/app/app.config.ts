import { ApplicationConfig, provideBrowserGlobalErrorListeners, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Observable } from 'rxjs';

import { routes } from './app.routes';
import { portfolioReducer } from './core/presentation/store/portfolio.reducer';
import { PortfolioEffects } from './core/presentation/store/portfolio.effects';
import { PortfolioRepository } from './core/domain/repositories/portfolio.repository';
import { MockPortfolioRepository } from './core/data/mock-portfolio.repository';

export class CustomTranslateLoader implements TranslateLoader {
  constructor(private http: HttpClient) {}
  getTranslation(lang: string): Observable<any> {
    return this.http.get(`./assets/i18n/${lang}.json`);
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new CustomTranslateLoader(http);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'es',
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
    ),
    provideStore({ portfolio: portfolioReducer }),
    provideEffects([PortfolioEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
    provideAnimationsAsync(),
    { provide: PortfolioRepository, useClass: MockPortfolioRepository }
  ]
};
