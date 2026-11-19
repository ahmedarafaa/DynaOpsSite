import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Button } from '../../../../shared/ui/button/button';
import { DemoRequestService } from '../../services/demo-request.service';
import type { DemoField, DemoFormContent, DemoFormStatus } from '../../demo.model';
import { normalizePhone, phoneValidator } from '../../validators/phone.validator';
import { textLength } from '../../validators/text-length.validator';

// Request form of the Book a Demo page; swaps to a confirmation once the request is sent.
@Component({
  selector: 'app-demo-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, RouterLink, Button],
  templateUrl: './demo-form.html',
  host: {
    class:
      'block px-6 pt-8 pb-12 md:px-10 md:pt-12 md:pb-16 lg:min-h-0 lg:overflow-y-auto lg:pb-18 lg:short:py-6',
  },
})
export class DemoForm {
  private readonly requests = inject(DemoRequestService);
  private readonly host: ElementRef<HTMLElement> = inject(ElementRef);

  readonly content = input.required<DemoFormContent>();

  protected readonly status = signal<DemoFormStatus>('idle');
  protected readonly submitted = signal(false);

  // Rules follow the Figma handoff spec (node 10712:156256).
  protected readonly form = inject(FormBuilder).nonNullable.group({
    name: ['', textLength(2, 80)],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, phoneValidator]],
    company: ['', textLength(2, 100)],
    message: ['', textLength(0, 1000)],
  });

  // Errors appear once the field was left or a submit was tried, then follow the typing.
  protected error(field: DemoField): string | null {
    const control = this.form.controls[field.id];
    const show = control.invalid && (control.touched || this.submitted());
    return show ? field.error : null;
  }

  protected async submit(): Promise<void> {
    this.submitted.set(true);
    if (this.status() === 'sending') {
      return;
    }
    if (this.form.invalid) {
      this.focusFirstInvalid();
      return;
    }
    const value = this.form.getRawValue();
    const request = { ...value, phone: normalizePhone(value.phone) };
    this.status.set('sending');
    this.form.disable();
    try {
      await this.requests.send(request);
      this.status.set('sent');
    } catch {
      this.form.enable();
      this.status.set('failed');
    }
  }

  // Closes the tab the CTA opened; when the browser refuses, the link's own navigation goes home.
  protected close(): void {
    window.close();
  }

  private focusFirstInvalid(): void {
    const field = this.content().fields.find(({ id }) => this.form.controls[id].invalid);
    if (field) {
      this.host.nativeElement.querySelector<HTMLElement>(`#demo-${field.id}`)?.focus();
    }
  }
}
