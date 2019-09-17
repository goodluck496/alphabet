import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Letter }                                                                   from '../../models/letter.model';

@Component({
  selector: 'app-small-letter',
  templateUrl: './small-letter.component.html',
  styleUrls: ['./small-letter.component.scss']
})
export class SmallLetterComponent implements OnInit, OnChanges {

  @Input() letter: Letter;
  @Output() selectLetter: EventEmitter<Letter> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes.letter && changes.letter.currentValue) {
      this.letter = changes.letter.currentValue;
    }

  }

  onClick(): void {
    this.selectLetter.emit(this.letter);
  }

}
