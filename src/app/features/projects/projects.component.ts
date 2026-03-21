import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { selectProjects } from '../../core/presentation/store/portfolio.selectors';
import { Project } from '../../core/domain/models/project.model';

@Component({
  selector: 'app-project-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './project-dialog.component.html',
  styleUrl: './project-dialog.component.scss'
})
export class ProjectDialogComponent {
  data = inject<Project>(MAT_DIALOG_DATA);
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  private store = inject(Store);
  private dialog = inject(MatDialog);
  
  projects$ = this.store.select(selectProjects);

  openProject(project: Project) {
    this.dialog.open(ProjectDialogComponent, {
      data: project,
      width: '600px',
      maxWidth: '90vw',
      panelClass: document.body.classList.contains('dark-theme') ? 'dark-theme' : ''
    });
  }
}
