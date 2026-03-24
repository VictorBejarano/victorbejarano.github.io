import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { selectIsDarkMode, selectLanguage, selectProfile } from '../../../core/presentation/store/portfolio.selectors';
import { toggleTheme, setLanguage, loadPortfolioData } from '../../../core/presentation/store/portfolio.actions';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NgxParticlesModule } from "@tsparticles/angular";
import { MoveDirection, OutMode, type Engine, type ISourceOptions } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule, RouterOutlet, RouterLink, RouterLinkActive,
    MatSidenavModule, MatListModule, MatIconModule, MatButtonModule, MatToolbarModule, MatMenuModule,
    TranslateModule, NgxParticlesModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  private translate = inject(TranslateService);
  private themeSubscription?: Subscription;
  private langSubscription?: Subscription;

  isDarkMode$ = this.store.select(selectIsDarkMode);
  currentLanguage$ = this.store.select(selectLanguage);
  profile$ = this.store.select(selectProfile);

  private breakpointObserver = inject(BreakpointObserver);
  isMobile$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => result.matches)
  );

  // Particles Configuration
  id = "tsparticles";
  particlesOptions: ISourceOptions = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: false,
          mode: "push",
        },
        onHover: {
          enable: false,
          mode: "repulse",
        },
        resize: {
           enable: true
        },
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: "#4da6ff",
      },
      links: {
        color: "#4da6ff",
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
      move: {
        direction: MoveDirection.none,
        enable: true,
        outModes: {
          default: OutMode.out,
        },
        random: false,
        speed: 1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
        },
        value: 80,
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 5 },
      },
    },
    detectRetina: true,
  };

  async particlesInit(engine: Engine): Promise<void> {
    await loadFull(engine);
  }

  ngOnInit() {
    this.store.dispatch(loadPortfolioData());
    this.themeSubscription = this.isDarkMode$.subscribe(isDark => {
      this.applyTheme(isDark);
    });
    this.langSubscription = this.currentLanguage$.subscribe(lang => {
      this.translate.use(lang);
    });
  }

  ngOnDestroy() {
    this.themeSubscription?.unsubscribe();
    this.langSubscription?.unsubscribe();
  }

  toggleTheme() {
    this.store.dispatch(toggleTheme());
  }

  private applyTheme(isDark: boolean) {
    if (isDark) {
      document.body.classList.add('dark-theme');
      document.documentElement.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
      document.documentElement.classList.remove('dark-theme');
    }
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
    this.store.dispatch(setLanguage({ language: lang }));
  }
}
