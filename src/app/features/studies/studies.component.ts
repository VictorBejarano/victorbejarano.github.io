import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectStudies } from '../../core/presentation/store/portfolio.selectors';

@Component({
  selector: 'app-studies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './studies.component.html',
  styleUrl: './studies.component.scss'
})
export class StudiesComponent {
  private store = inject(Store);
  studies$ = this.store.select(selectStudies);
}
