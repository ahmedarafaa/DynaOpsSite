export type DemoFieldId = 'name' | 'email' | 'phone' | 'company' | 'message';

export type DemoRequest = Record<DemoFieldId, string>;

export type DemoFormStatus = 'idle' | 'sending' | 'sent' | 'failed';

export interface DemoField {
  id: DemoFieldId;
  label: string;
  placeholder: string;
  type: 'text' | 'email' | 'tel' | 'textarea';
  autocomplete: string;
  required: boolean;
  // Shown under the field for any failed rule.
  error: string;
  // Shares its row with the next field from the md breakpoint.
  half?: boolean;
  // Addresses and numbers stay left-to-right on the Arabic page.
  ltr?: boolean;
}

export interface DemoFormContent {
  title: string;
  description: string;
  fields: DemoField[];
  submit: string;
  sending: string;
  consent: string;
  failed: string;
  success: { title: string; description: string; back: string };
}

export interface DemoArtFeature {
  icon: string;
  label: string;
}

export interface DemoBrandContent {
  logoAlt: string;
  title: string;
  art: { prompt: string; label: string; columns: DemoArtFeature[][] };
}

export interface DemoContent {
  form: DemoFormContent;
  brand: DemoBrandContent;
}
