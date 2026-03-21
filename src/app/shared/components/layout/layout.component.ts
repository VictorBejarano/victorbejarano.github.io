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
import { selectIsDarkMode, selectLanguage } from '../../../core/presentation/store/portfolio.selectors';
import { toggleTheme, setLanguage } from '../../../core/presentation/store/portfolio.actions';
import { Subscription } from 'rxjs';
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

  isDarkMode$ = this.store.select(selectIsDarkMode);
  currentLanguage$ = this.store.select(selectLanguage);

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
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
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
