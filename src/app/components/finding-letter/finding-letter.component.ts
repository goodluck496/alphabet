import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Subscription, timer }                                from 'rxjs';
import { take }                                               from 'rxjs/operators';
import { Letter }                                             from '../../services/letters.service';

@Component({
  selector: 'app-finding-letter',
  templateUrl: './finding-letter.component.html',
  styleUrls: ['./finding-letter.component.scss']
})
export class FindingLetterComponent implements OnInit, OnChanges {
  checkLetter: 0 | 1 | 2 = 0;

  @Input() selectedLetter: Letter;

  private _checkTimer: Subscription;

  constructor() {
  }

  get word(): string[] {
    return this.selectedLetter.words[0].split('');
  }

  get checkValid(): boolean {
    return this.checkLetter === 1;
  }

  get checkInvalid(): boolean {
    return this.checkLetter === 2;
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.checkLetter = 0;
  }

  checkLetterInWord(letter: string): void {
    this.checkLetter = letter === this.selectedLetter.char ? 1 : 2;

    if (this._checkTimer) {
      this._checkTimer.unsubscribe();
      this._checkTimer = undefined;
    }

    this._checkTimer = timer(3000)
      .pipe(take(1))
      .subscribe(() => this.checkLetter = 0);
  }

  getLetterChecked(letter: string): boolean {
    return this.selectedLetter.char === letter;
  }

  letterChecked(letter: string): boolean {
    return this.getLetterChecked(letter) && this.checkLetter === 1;
  }


}
