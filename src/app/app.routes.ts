import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./features/home/home.component').then(c => c.HomeComponent), data: { animation: 'homePage' } },
  { path: 'profiles', loadComponent: () => import('./features/profiles/profiles.component').then(c => c.ProfilesComponent), data: { animation: 'profilesPage' } },
  { path: 'studies', loadComponent: () => import('./features/studies/studies.component').then(c => c.StudiesComponent), data: { animation: 'studiesPage' } },
  { path: 'experience', loadComponent: () => import('./features/experience/experience.component').then(c => c.ExperienceComponent), data: { animation: 'experiencePage' } },
  { path: 'projects', loadComponent: () => import('./features/projects/projects.component').then(c => c.ProjectsComponent), data: { animation: 'projectsPage' } },
  { path: '**', redirectTo: 'home' }
];
