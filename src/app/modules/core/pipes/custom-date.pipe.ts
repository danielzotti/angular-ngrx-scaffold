import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe extends DatePipe implements PipeTransform {
  transform(date: string, pattern?: string): string {
    // validate/initialize date
    let newDate = null;
    try {
      newDate = super.transform(date, pattern);
    } catch (ex) {
      console.log('[CustomDatePipe]', ex);
      return null;
    }
    return newDate;
  }
}
