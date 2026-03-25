import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { selectProfile } from '../../core/presentation/store/portfolio.selectors';
import { Profile } from '../../core/domain/models/profile.model';
import { Observable } from 'rxjs';
import { PortfolioState } from '../../core/presentation/store/portfolio.reducer';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TranslateModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private store = inject(Store<{ portfolio: PortfolioState }>);
  profile$: Observable<Profile | null> = this.store.select(selectProfile);

  ngOnInit() {}
}
