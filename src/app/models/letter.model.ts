import { Word } from './word.model';


export class Letter {
  char: string = '';
  word: Word = new Word();
  selected: boolean = false;
  vowel: boolean = false;
  words: string[] = [];

  constructor(props?: Letter | any) {
    if (!props) {
      return;
    }
    Object.keys(props)
      .filter(k => !!props[k])
      .forEach(k => this[k] = props[k]);

  }
}
