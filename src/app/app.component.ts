import {Component, OnInit} from '@angular/core';
import {SettingsService} from './settings.service';
import {ThemeService} from './theme.service';

import {faCloud, faCloudDownloadAlt, faFilm, faTv} from '@fortawesome/free-solid-svg-icons';
import {faTwitter} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private settings$: SettingsService, private theme$: ThemeService) {}

  cloud = faCloud;
  twitter = faTwitter;

  download = faCloudDownloadAlt;
  movie = faFilm;
  tv = faTv;

  ngOnInit(): void {
    this.settings$.getTitle().subscribe(title => {
      document.title = title;
    });
  }
}
