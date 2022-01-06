import {Component, OnInit} from '@angular/core';
import {TransmissionService} from '../transmission.service';

@Component({
  selector: 'app-transmission-overview',
  templateUrl: './transmission-overview.component.html',
  styleUrls: ['./transmission-overview.component.scss']
})
export class TransmissionOverviewComponent implements OnInit {
  /** constructor(private cli: TransmissionService) {} */
  constructor() {}
  ngOnInit(): void {}
}
