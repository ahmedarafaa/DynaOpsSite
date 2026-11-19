import type { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Counts characters without surrounding spaces; a minimum of 0 lets the field stay empty.
export function textLength(min: number, max: number): ValidatorFn {
  return (control: AbstractControl<string>): ValidationErrors | null => {
    const length = control.value.trim().length;
    return length >= min && length <= max ? null : { textLength: true };
  };
}
