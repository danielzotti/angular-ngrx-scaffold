import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import { Directive, Input } from '@angular/core';
import { datePatternValidator } from './date-pattern.validator';
import { ConfigService } from '../config/config.service';

@Directive({
  selector: '[psDatePattern]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: DatePatternValidatorDirective,
      multi: true
    }
  ]
})
export class DatePatternValidatorDirective implements Validator {
  @Input('psDatePattern') date: string;

  validate(control: AbstractControl): { [key: string]: any } | null {
    return this.date && control.value
      ? datePatternValidator(this.date)(control)
      : null;
    // return datePatternValidator(this.date)(control);
  }
}
