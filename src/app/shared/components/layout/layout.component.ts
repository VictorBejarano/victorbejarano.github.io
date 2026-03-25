import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
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

import { trigger, transition, style, query, animate, group, stagger, state } from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
  transition('* <=> *', [
    query(':enter', [
      style({ opacity: 0, transform: 'translateY(10px)', position: 'absolute', width: 'calc(100% - 2rem)' })
    ], { optional: true }),
    query(':leave', [
      style({ position: 'absolute', width: 'calc(100% - 2rem)' }),
      animate('200ms ease-out', style({ opacity: 0, transform: 'translateY(-10px)' }))
    ], { optional: true }),
    query(':enter', [
      style({ position: 'relative', width: 'auto' }),
      animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
    ], { optional: true }),
  ]),
]);

export const menuItemAnimation = trigger('menuItemAnimation', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(-20px)' }),
    animate('0.3s {{delay}}ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
  ], { params: { delay: 0 } })
]);

export const textPulse = trigger('textPulse', [
  transition('* => *', [
    style({ opacity: 0.5, transform: 'scale(0.98)' }),
    animate('0.4s ease-out', style({ opacity: 1, transform: 'scale(1)' }))
  ])
]);

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule, RouterOutlet, RouterLink, RouterLinkActive,
    MatSidenavModule, MatListModule, MatIconModule, MatButtonModule, MatToolbarModule, MatMenuModule,
    TranslateModule, NgxParticlesModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  animations: [fadeAnimation, menuItemAnimation, textPulse]
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

  particlesInit = async (engine: Engine): Promise<void> => {
    await loadFull(engine);
  };

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
    const isBrowser = typeof window !== 'undefined';
    if (!isBrowser) return;

    // iOS and Safari struggle with View Transition snapshots + backdrop-filter
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) || 
                  /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if ('startViewTransition' in document && !isIOS) {
      (document as any).startViewTransition(() => {
        this.store.dispatch(toggleTheme());
      });
    } else {
        // Fallback for browsers that don't support View Transition API
        const doc = document as any;
        doc.documentElement.classList.add('theme-transitioning');
        this.store.dispatch(toggleTheme());
        setTimeout(() => {
          doc.documentElement.classList.remove('theme-transitioning');
        }, 500);
    }
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

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  private router = inject(Router);

  closeAndNavigate(path: string, sidenav: any) {
    const isMobile = window.innerWidth <= 768; // simple check for mobile without subscription delays
    if (isMobile) {
      sidenav.close().then(() => {
        this.router.navigate([path]);
      });
    } else {
      this.router.navigate([path]);
    }
  }
}
