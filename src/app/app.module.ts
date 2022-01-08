import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashPanelComponent } from './dash-panel/dash-panel.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { ThemePickerComponent } from './theme-picker/theme-picker.component';
import { TransmissionOverviewComponent } from './transmission-overview/transmission-overview.component';

@NgModule({
  declarations: [
    AppComponent,
    DashPanelComponent,
    ThemePickerComponent,
    TransmissionOverviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
