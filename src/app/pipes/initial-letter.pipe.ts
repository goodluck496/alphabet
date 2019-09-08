import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initialLetter'
})
export class InitialLetterPipe implements PipeTransform {

  transform(value: string): string {
    return value.toUpperCase() + value.toLowerCase();
  }

}
