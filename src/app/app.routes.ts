import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./features/home/home.component').then(c => c.HomeComponent) },
  { path: 'profiles', loadComponent: () => import('./features/profiles/profiles.component').then(c => c.ProfilesComponent) },
  { path: 'studies', loadComponent: () => import('./features/studies/studies.component').then(c => c.StudiesComponent) },
  { path: 'experience', loadComponent: () => import('./features/experience/experience.component').then(c => c.ExperienceComponent) },
  { path: 'projects', loadComponent: () => import('./features/projects/projects.component').then(c => c.ProjectsComponent) },
  { path: '**', redirectTo: 'home' }
];
