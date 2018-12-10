import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ConfigService } from '../config/config.service';

export function datePatternValidator(date: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!date) {
      date = ConfigService.DATE_DEFAULT_PATTERN;
    }
    const regexDate = new RegExp(date);
    const isValid = regexDate.test(control.value);
    return isValid ? null : { datePattern: { value: control.value } };
  };
}
