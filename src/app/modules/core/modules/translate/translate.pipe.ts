import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from './translate.service';
/*
 * Trasforma una stringa da camelCase a testo normale
 * Usage:
 *   value | translate:'key'
*/
@Pipe({ name: 'translate' })
export class TranslatePipe implements PipeTransform {
  constructor(private translateService: TranslateService) {}

  transform(value: string, key: string): string {
    // console.log(value, key);
    return this.translateService.translate(value, key);
  }
}
