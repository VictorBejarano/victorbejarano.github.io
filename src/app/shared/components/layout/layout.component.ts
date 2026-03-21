import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { selectIsDarkMode } from '../../../core/presentation/store/portfolio.selectors';
import { toggleTheme, setLanguage } from '../../../core/presentation/store/portfolio.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule, RouterOutlet, RouterLink, RouterLinkActive,
    MatSidenavModule, MatListModule, MatIconModule, MatButtonModule, MatToolbarModule,
    TranslateModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  private translate = inject(TranslateService);
  private themeSubscription?: Subscription;

  isDarkMode$ = this.store.select(selectIsDarkMode);

  ngOnInit() {
    this.themeSubscription = this.isDarkMode$.subscribe(isDark => {
      this.applyTheme(isDark);
    });
  }

  ngOnDestroy() {
    this.themeSubscription?.unsubscribe();
  }

  toggleTheme() {
    this.store.dispatch(toggleTheme());
  }

  private applyTheme(isDark: boolean) {
    if (isDark) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
    this.store.dispatch(setLanguage({ language: lang }));
  }
}
