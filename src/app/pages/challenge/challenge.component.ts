import { Component, OnDestroy, OnInit }                                      from '@angular/core';
import { ActivatedRoute, Router }                                            from '@angular/router';
import { BehaviorSubject, combineLatest, Observable, Subject, Subscription } from 'rxjs';
import { map, take }                                                         from 'rxjs/operators';
import { Letter }                                                            from '../../models/letter.model';
import { CHECK_LETTER }                                                      from '../../services/helpers';
import { LettersService }                                                    from '../../services/letters.service';


@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss']
})
export class ChallengeComponent implements OnInit, OnDestroy {

  selectedLetter$: BehaviorSubject<Letter> = new BehaviorSubject<Letter>(new Letter());
  checkLetter$: BehaviorSubject<CHECK_LETTER> = new BehaviorSubject<CHECK_LETTER>(CHECK_LETTER.DEFAULT);

  private _checkTimer: Subscription;
  private _onDestroy: Subject<void> = new Subject();

  constructor(
    private lettersService: LettersService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  get letters$(): Observable<Letter[]> {
    return this.lettersService.letters$
      .pipe(
        map(v => v.sort((a, b) => {
          const aCode: string = a.char.toLowerCase().replace('ё', 'е' + String.fromCharCode(1110));
          const bCode: string = b.char.toLowerCase().replace('ё', 'е' + String.fromCharCode(1110));
          return aCode.charCodeAt(0) - bCode.charCodeAt(0);
        }))
      );
  }

  selectLetter(letter: Letter): void {
    try {
      letter.words.sort(() => .5 - Math.random());
      this.router.navigate(['challenge', letter.char]);
      this.lettersService.selectLetter(letter);
      this.selectedLetter$.next(letter);
      this.checkLetter$.next(CHECK_LETTER.DEFAULT);
    } catch (e) {
      console.error(e);
    }
  }



  ngOnInit() {
    combineLatest(this.route.paramMap, this.letters$)
      .pipe(take(1))
      .subscribe(([route, array]) => {
        if (!!route.get('char') && !!array) {
          const foundLetter: Letter = array.find(l => l.char === route.get('char'));
          if (!foundLetter) {
            console.warn(`Not found letter - '${route.get('char')}'`);
            return;
          }
          this.selectLetter(foundLetter);
        } else {
          this.router.navigate(['challenge', 'а']);
        }
      });
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
