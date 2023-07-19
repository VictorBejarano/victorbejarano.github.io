import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PresentationComponent } from './pages/presentation/presentation.component';
import { LandingPageComponent } from './landing-page.component';
import { WhoIAmComponent } from './pages/who-i-am/who-i-am.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    children: [
      {
        path: '',
      },
      {
        path: 'welcome',
        component: PresentationComponent,
      },
      {
        path: 'who-i-am',
        component: WhoIAmComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingPageRoutingModule {}
