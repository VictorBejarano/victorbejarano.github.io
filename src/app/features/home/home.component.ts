import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { selectProfile } from '../../core/presentation/store/portfolio.selectors';
import { loadPortfolioData } from '../../core/presentation/store/portfolio.actions';
import { NgxParticlesModule } from "@tsparticles/angular";
import { MoveDirection, OutMode, type Engine, type ISourceOptions } from "@tsparticles/engine";
import { loadFull } from "tsparticles";
import { Profile } from '../../core/domain/models/profile.model';
import { Observable } from 'rxjs';
import { PortfolioState } from '../../core/presentation/store/portfolio.reducer';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TranslateModule, NgxParticlesModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private store = inject(Store<{ portfolio: PortfolioState }>);
  profile$: Observable<Profile | null> = this.store.select(selectProfile);
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
    this.store.dispatch(loadPortfolioData());
  }
}
