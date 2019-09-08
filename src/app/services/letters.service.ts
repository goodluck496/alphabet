import { Injectable }                  from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Word {
  name: string;
  image: string;
}

export class Letter {
  char: string = '';
  word: Word;
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

export interface Word {
  name: string;
  image: string;
}

const wordsInFirstLetter: Word[] = [
  {name: 'арбуз', image: 'https://kipmu.ru/wp-content/uploads/watermelon.jpg'},
  {name: 'баран', image: 'https://www.proza.ru/pics/2018/04/19/815.jpg'},
  {name: 'варежка', image: 'https://www.bookvoed.ru/files/1836/44/84/21/7.JPG'},
  {name: 'гусь', image: 'https://upload.wikimedia.org/wikipedia/commons/d/de/CorporationParkGoose.JPG'},
  {name: 'дирижабль', image: 'https://upload.wikimedia.org/wikipedia/commons/d/de/CorporationParkGoose.JPG'},
  {name: 'ель', image: 'https://avatars.mds.yandex.net/get-mpic/96484/img_id5933253325839792409/9hq'},
  {name: 'ёж', image: ''},
  {name: 'зеленый', image: ''},
  {name: 'институт', image: ''},
  {name: 'йод', image: ''},
  {name: 'красный', image: ''},
  {name: 'лайм', image: ''},
  {name: 'мультик', image: ''},
  {name: 'носорог', image: ''},
  {name: 'олень', image: ''},
  {name: 'пушка', image: ''},
  {name: 'рука', image: ''},
  {name: 'сосиска', image: ''},
  {name: 'телефон', image: ''},
  {name: 'утка', image: ''},
  {name: 'фотоаппарат', image: ''},
  {name: 'хамелеон', image: ''},
  {name: 'цыгане', image: ''},
  {name: 'чашка', image: ''},
  {name: 'шапка', image: ''},
  {name: 'щука', image: ''},
  {name: 'въезд', image: ''},
  {name: 'рыба', image: ''},
  {name: 'мальчик', image: ''},
  {name: 'экран', image: ''},
  {name: 'юбка', image: ''},
  {name: 'яйцо', image: ''},
];
const words: string[] = [
  'баран', 'валентинка', 'гром', 'йод',
  'объем', 'джиуджицу', 'филин', 'щука',
  'мяч', 'хризантема', 'любовь', 'паника',
  'сосиска', 'фантастика', 'хрен', 'цапля',
  'шишка', 'школьник', 'трактор', 'арбуз',
  'эмансипация', 'сыр', 'юла', 'яблоко', 'улитка',
  ...wordsInFirstLetter.map(w => w.name)
];

const MOCK_LETTERS: Letter[] = [
  ...['а', 'е', 'ё', 'и', 'о', 'у', 'ы', 'э', 'ю', 'я']
    .map(i => new Letter({
      char: i,
      vowel: true,
      word: wordsInFirstLetter.find(w => w.name.toLowerCase().charAt(0) === i),
      words: words
        .filter(w => w.toLowerCase().includes(i))
    })),
  ...['б', 'в', 'г', 'д', 'ж', 'з', 'й', 'к', 'л', 'м', 'н', 'п', 'р', 'с', 'т', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ь']
    .map(i => new Letter({
      char: i,
      vowel: false,
      word: wordsInFirstLetter.find(w => w.name.toLowerCase()[0] === i)
        || wordsInFirstLetter.find(w => w.name.toLowerCase().includes(i)),
      words: words
        .filter(w => w.toLowerCase().includes(i))
    }))
];


@Injectable({
  providedIn: 'root'
})
export class LettersService {

  private _letters: BehaviorSubject<Letter[]> = new BehaviorSubject(MOCK_LETTERS);

  constructor() {
  }

  get letters$(): Observable<Letter[]> {
    return this._letters.asObservable();
  }

  selectLetter(data: Letter): void {
    const letter: Letter = this._letters.getValue()
      .find(l => l.char === data.char);

    if (!letter) {
      throw new Error(`not found letter '${data.char}'`);
    }

    this._letters.next(this._letters.getValue().map(l => {
      if (data.char === l.char) {
        l.selected = true;
      } else {
        l.selected = false;
      }
      return l;
    }));

  }

}
