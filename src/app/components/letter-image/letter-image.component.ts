import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Letter }                                             from '../../models/letter.model';

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
  }

  get image(): string {
    return this.letter.word.image;
  }

  get word(): string {
    return this.letter.word.name;
  }
}
