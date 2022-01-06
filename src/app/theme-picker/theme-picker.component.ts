import {Component} from '@angular/core';
import {ThemeService, ColourKeys, Colors} from '../theme.service'

@Component({
  selector: 'app-theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.scss']
})
export class ThemePickerComponent {
  schemes: string[] = [];
  colors = ColourKeys;

  selectedColor: Colors = 'yellow';
  selectedScheme: string = '';

  constructor(private theme: ThemeService) {
    this.theme.getSchemes().subscribe(schemes => this.schemes = schemes);
    this.theme.boxColor.subscribe(selectedColor => this.selectedColor = selectedColor);
    this.theme.key.subscribe(key => this.selectedScheme = key);
  }

  updateTheme(e: Event) {
    const el = (e.target as HTMLSelectElement);
    this.theme.setTheme(el.value);
  }

  updateColorScheme(e: Event) {
    const el = (e.target as HTMLSelectElement);
    this.theme.setColorScheme(el.value as Colors)
  }
}
