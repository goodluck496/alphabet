import { Injectable }                  from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Letter }                      from '../models/letter.model';
import { Word }                        from '../models/word.model';

const wordsInFirstLetter: Word[] = [
  {name: 'арбуз', image: 'https://kipmu.ru/wp-content/uploads/watermelon.jpg'},
  {name: 'баран', image: 'https://www.proza.ru/pics/2018/04/19/815.jpg'},
  {name: 'варежка', image: 'https://www.bookvoed.ru/files/1836/44/84/21/7.JPG'},
  {name: 'гусь', image: 'https://upload.wikimedia.org/wikipedia/commons/d/de/CorporationParkGoose.JPG'},
  {name: 'дирижабль', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/USS_Macon_F9C.jpg/220px-USS_Macon_F9C.jpg'},
  {name: 'ель', image: 'https://avatars.mds.yandex.net/get-mpic/96484/img_id5933253325839792409/9hq'},
  {name: 'ёж', image: 'http://mirplaneta.ru/images/4/630.jpg'},
  {name: 'жаба', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Bufotes_oblongus.jpg/275px-Bufotes_oblongus.jpg'},
  {name: 'зеленый', image: 'https://libdiz.com/wp-content/uploads/2016/01/G.jpg'},
  {name: 'институт', image: 'http://www.iacp.dvo.ru/resources/fileman/Uploads/IMG_7038.JPG'},
  {name: 'йод', image: 'https://dialog.ru/upload/iblock/384/384f800f66dfb0c3883ea67060792a54.png'},
  {name: 'красный', image: 'https://upload.wikimedia.org/wikipedia/commons/4/43/Red_flag.svg'},
  {name: 'лайм', image: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Limette.jpg'},
  {name: 'мультик', image: 'https://i.ytimg.com/vi/g4PRYWs-3io/maxresdefault.jpg'},
  {name: 'носорог', image: 'https://o-prirode.ru/wp-content/uploads/2017/10/indijskiy-nosorog-696x464.jpg'},
  {name: 'олень', image: ''},
  {
    name: 'пушка',
    image: 'data:image/jpeg;base64,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'
  },
  {name: 'рука', image: ''},
  {name: 'сосиска', image: ''},
  {name: 'телефон', image: ''},
  {name: 'утка', image: 'http://www.vokrugsveta.ru/img/bx/iblock/3ce/3cea70ab1bc699d6beb3078736957ae3.jpg'},
  {name: 'фотоаппарат', image: ''},
  {name: 'хамелеон', image: ''},
  {name: 'цыгане', image: 'https://interaffairs.ru/i/gypsy.jpg'},
  {name: 'чашка', image: ''},
  {name: 'шапка', image: 'https://st.tsum.com/btrx/i/18/61/14/4//01_1526.jpg'},
  {name: 'щука', image: ''},
  {name: 'въезд', image: ''},
  {name: 'рыба', image: 'http://blogsamopoznanie.ru/wp-content/uploads/2017/12/%D0%9C%D0%B8%D0%BD%D0%B8%D0%B0%D1%82%D1%8E%D1%80%D0%B0-e1514622914303.jpg'},
  {name: 'мальчик', image: ''},
  {name: 'экран', image: ''},
  {name: 'юбка', image: ''},
  {name: 'яйцо', image: 'https://images.lady.mail.ru/454422/'},
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
    .map(i => {
      let word: Word = wordsInFirstLetter.find(w => w.name.toLowerCase()[0] === i);
      if (!word) {
        word = wordsInFirstLetter.find(w => w.name.toLowerCase().includes(i));
      }
      return new Letter({
        char: i,
        vowel: true,
        word: new Word(word),
        words: words
          .filter(w => w.toLowerCase().includes(i))
      });
    }),
  ...['б', 'в', 'г', 'д', 'ж', 'з', 'й', 'к', 'л', 'м', 'н', 'п', 'р', 'с', 'т', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ь']
    .map(i => {
      let word: Word = wordsInFirstLetter.find(w => w.name.toLowerCase()[0] === i);
      if (!word) {
        word = wordsInFirstLetter.find(w => w.name.toLowerCase().includes(i));
      }

      return new Letter({
        char: i,
        vowel: false,
        word: new Word(word),
        words: words
          .filter(w => w.toLowerCase().includes(i))
      });
    })
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
