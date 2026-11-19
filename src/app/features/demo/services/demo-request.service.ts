import { Injectable } from '@angular/core';

import type { DemoRequest } from '../demo.model';

// Placeholder: point this at the service that receives demo requests.
const ENDPOINT = '/api/demo-requests';

@Injectable({ providedIn: 'root' })
export class DemoRequestService {
  async send(request: DemoRequest): Promise<void> {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });
    if (!response.ok) {
      throw new Error(`Demo request failed with status ${response.status}`);
    }
  }
}
