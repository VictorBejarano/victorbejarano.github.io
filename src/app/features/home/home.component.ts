import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { selectProfile } from '../../core/presentation/store/portfolio.selectors';
import { loadPortfolioData } from '../../core/presentation/store/portfolio.actions';
import { Profile } from '../../core/domain/models/profile.model';
import { Observable } from 'rxjs';
import { PortfolioState } from '../../core/presentation/store/portfolio.reducer';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private store = inject(Store<{ portfolio: PortfolioState }>);
  profile$: Observable<Profile | null> = this.store.select(selectProfile);

  ngOnInit() {
    this.store.dispatch(loadPortfolioData());
  }
}
