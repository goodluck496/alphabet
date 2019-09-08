import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule }   from './app-routing.module';
import { AppComponent }       from './app.component';
import { ChallengeComponent } from './pages/challenge/challenge.component';
import { HomeComponent }      from './pages/home/home.component';
import { LettersService }     from './services/letters.service';
import { InitialLetterPipe } from './pipes/initial-letter.pipe';
import { SafeContentPipe } from './pipes/safe-content.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChallengeComponent,
    InitialLetterPipe,
    SafeContentPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    LettersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
