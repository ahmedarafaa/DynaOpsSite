import type { AbstractControl, ValidationErrors } from '@angular/forms';

const ARABIC_ZERO = 0x0660;
const PERSIAN_ZERO = 0x06f0;
// Digits and spaces, with one optional leading plus: no letters or other symbols.
const ALLOWED = /^\+?[\d ]+$/;
// Figma handoff spec: 7 to 15 digits (15 is the E.164 maximum).
const MIN_DIGITS = 7;
const MAX_DIGITS = 15;

function toLatinDigits(value: string): string {
  return value.trim().replace(/[٠-٩۰-۹]/g, (digit) => {
    const code = digit.charCodeAt(0);
    return String(code - (code >= PERSIAN_ZERO ? PERSIAN_ZERO : ARABIC_ZERO));
  });
}

// Latin digits with an optional leading plus: spaces dropped, a 00 prefix written as plus.
export function normalizePhone(value: string): string {
  const latin = toLatinDigits(value);
  const digits = latin.replace(/\D/g, '');
  if (latin.startsWith('+')) {
    return `+${digits}`;
  }
  return digits.startsWith('00') ? `+${digits.slice(2)}` : digits;
}

// Empty values pass, so `Validators.required` reports them instead.
export function phoneValidator(control: AbstractControl<string>): ValidationErrors | null {
  const value = control.value;
  if (!value) {
    return null;
  }
  const phone = normalizePhone(value);
  const international = phone.startsWith('+');
  const digits = international ? phone.slice(1) : phone;
  const valid =
    ALLOWED.test(toLatinDigits(value)) &&
    digits.length >= MIN_DIGITS &&
    digits.length <= MAX_DIGITS &&
    // Country codes never start with 0, and one repeated digit is not a number.
    !(international && digits.startsWith('0')) &&
    !/^(\d)\1+$/.test(digits);
  return valid ? null : { phone: true };
}
