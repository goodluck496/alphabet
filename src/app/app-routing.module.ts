import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChallengeComponent }   from './pages/challenge/challenge.component';
import { HomeComponent }        from './pages/home/home.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'challenge', component: ChallengeComponent},
  {path: 'challenge/:char', component: ChallengeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
