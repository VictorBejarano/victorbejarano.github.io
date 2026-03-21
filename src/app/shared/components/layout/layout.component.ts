import { Component, inject } from '@angular/core';
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
export class LayoutComponent {
  private store = inject(Store);
  private translate = inject(TranslateService);

  isDarkMode$ = this.store.select(selectIsDarkMode);

  toggleTheme() {
    this.store.dispatch(toggleTheme());
    // The class is toggled on the sidenav container using [class.dark-theme], 
    // but we can also apply it to the body for global effect.
    document.body.classList.toggle('dark-theme');
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
    this.store.dispatch(setLanguage({ language: lang }));
  }
}
