import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Letter }                                             from '../../services/letters.service';

@Component({
  selector: 'app-letter-image',
  templateUrl: './letter-image.component.html',
  styleUrls: ['./letter-image.component.scss']
})
export class LetterImageComponent implements OnInit, OnChanges {
  @Input() letter: Letter;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes.letter && changes.letter.currentValue) {
      this.letter = changes.letter.currentValue;
    }

  }

  get image(): string {
    return this.letter.word.image;
  }

  get word(): string {
    return this.letter.word.name;
  }
}
