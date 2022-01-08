import { Injectable } from '@angular/core';
import { Observable, from, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor() {}

  private title = 'Starty Dash';
  getTitle(): Observable<string> {
    return from([this.title]);
  }

  getTransmissionURL(): Observable<string> {
    return from(['https://download.connr.onl/transmission/rpc']);
  }
}
