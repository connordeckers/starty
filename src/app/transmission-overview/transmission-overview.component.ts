import { Component, OnInit } from '@angular/core';
import { switchMap, timer } from 'rxjs';
import {
  TransmissionService,
  SummaryInformation,
} from '../transmission.service';

import {
  faClock,
  faCheckCircle,
  faStream,
  faLaptopHouse,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-transmission-overview',
  templateUrl: './transmission-overview.component.html',
  styleUrls: ['./transmission-overview.component.scss'],
})
export class TransmissionOverviewComponent implements OnInit {
  overview?: SummaryInformation;

  pendingIcon = faClock;
  downloadingIcon = faLaptopHouse;
  seedingIcon = faCheckCircle;
  totalIcon = faStream;

  constructor(private cli: TransmissionService) {}
  ngOnInit(): void {
    timer(0, 1000)
      .pipe(switchMap(() => this.cli.getOverview()))
      .subscribe((data) => (this.overview = data));
  }
}
