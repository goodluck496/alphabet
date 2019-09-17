import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BehaviorSubject, Subscription, timer }               from 'rxjs';
import { take }                                               from 'rxjs/operators';
import { Letter }                                             from '../../models/letter.model';
import { CHECK_LETTER }                                       from '../../services/helpers';


@Component({
  selector: 'app-finding-letter',
  templateUrl: './finding-letter.component.html',
  styleUrls: ['./finding-letter.component.scss']
})
export class FindingLetterComponent implements OnInit, OnChanges {
  checkLetter: CHECK_LETTER = CHECK_LETTER.DEFAULT;

  @Input() selectedLetter: Letter;

  word$: BehaviorSubject<string[]> = new BehaviorSubject([]);
  private _checkTimer: Subscription;

  constructor() {
  }

  get checkValid(): boolean {
    return this.checkLetter === CHECK_LETTER.CHECKED;
  }

  get checkInvalid(): boolean {
    return this.checkLetter === CHECK_LETTER.NOT_CHECKED;
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.checkLetter = CHECK_LETTER.DEFAULT;

    if (!!this.selectedLetter.words.length) {
      this.word$.next(this.selectedLetter.words[0].split(''));
    }
  }

  resetCheck(): void {
    this.checkLetter = CHECK_LETTER.DEFAULT;
  }

  checkLetterInWord(letter: string): void {
    this.checkLetter = letter === this.selectedLetter.char ? CHECK_LETTER.CHECKED : CHECK_LETTER.NOT_CHECKED;

    if (this._checkTimer) {
      this._checkTimer.unsubscribe();
      this._checkTimer = undefined;
    }

    this._checkTimer = timer(3000)
      .pipe(take(1))
      .subscribe(() => this.resetCheck());
  }

  getLetterChecked(letter: string): boolean {
    return this.selectedLetter.char === letter;
  }

  letterChecked(letter: string): boolean {
    return this.getLetterChecked(letter) && this.checkLetter === CHECK_LETTER.CHECKED;
  }


}
