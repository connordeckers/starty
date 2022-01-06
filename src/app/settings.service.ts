import {Injectable} from '@angular/core';
import {Observable, from} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  constructor() {}

  private title = 'Starty Dash';
  getTitle(): Observable<string> {
    return from([this.title]);
  }
}
