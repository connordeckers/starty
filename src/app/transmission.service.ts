import {Injectable} from '@angular/core';
import {Client} from 'transmission-api'

@Injectable({
  providedIn: 'root'
})
export class TransmissionService {
  constructor() {
    console.log(Client);
  }
}
