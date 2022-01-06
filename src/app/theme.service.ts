import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Subject, BehaviorSubject} from 'rxjs';

import theme from './theme.json';

interface ColorRange {
  dark: string;
  light: string;
}

export interface ThemeResource {
  background: string;
  foreground: string;

  black: ColorRange;
  white: ColorRange;

  magenta: ColorRange;
  yellow: ColorRange;
  green: ColorRange;
  blue: ColorRange;
  cyan: ColorRange;
  red: ColorRange;
}

export interface ThemeJson {
  background: string;
  foreground: string;
  color: string[];
  author: string;
  name: string;
}

const keys = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'] as const;
export const ColourKeys = keys;

export type Colors = typeof keys[number];
const schemaRepository = 'https://terminal.sexy/schemes/'

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeJson: ThemeJson = theme;
  private themeParsed!: ThemeResource;

  private boxcolor!: Colors;
  private id: string = '';

  theme: Subject<ThemeResource> = new Subject();
  key: BehaviorSubject<string> = new BehaviorSubject(this.id);
  boxColor: BehaviorSubject<Colors> = new BehaviorSubject(this.boxcolor);

  constructor(private http: HttpClient) {
    this.theme.subscribe(theme => {
      this.themeParsed = theme;
      this.applyTheme(theme);
    });

    /**
      * this.boxColor.subscribe(color => {
      *   this.applyTheme(this.themeParsed);
      * })
      */

    if (window.localStorage.getItem('theme-key')) {
      this.loadTheme();
    } else {
      this.boxcolor = 'green';
      this.boxColor.next(this.boxcolor);
      this.parseJson();
    }
  }

  private saveTheme() {
    window.localStorage.setItem('theme-json', JSON.stringify(this.themeJson));
    window.localStorage.setItem('theme-box-color', this.boxcolor);
  }

  private loadTheme() {
    const box = window.localStorage.getItem('theme-box-color') as Colors;
    this.boxcolor = box;
    this.boxColor.next(box);

    this.id = window.localStorage.getItem('theme-key') ?? '';
    this.key.next(this.id);

    this.themeJson = JSON.parse(window.localStorage.getItem('theme-json') || '{}');
    this.parseJson();
  }


  private applyTheme(theme: ThemeResource) {
    document.body.style.setProperty('--theme-background', theme.background);
    document.body.style.setProperty('--theme-foreground', theme.foreground);

    for (let i = 0; i < 8; i++) {
      const key = keys[i] as keyof ThemeResource;
      const obj = theme[key] as ColorRange;

      document.body.style.setProperty(`--theme-${key}-light`, obj.light);
      document.body.style.setProperty(`--theme-${key}-dark`, obj.dark);

      if (key == this.boxcolor) {
        // This is the chosen box-color
        document.body.style.setProperty(`--theme-box-light`, obj.light);
        document.body.style.setProperty(`--theme-box-dark`, obj.dark);
      }
    }
  }

  private parseJson() {
    const theme = this.themeJson;
    const obj: any = {
      background: theme.background,
      foreground: theme.foreground,
    };

    for (let i = 0; i < 8; i++) {
      const key = keys[i] as keyof ThemeResource;
      obj[key] = {dark: theme.color[i], light: theme.color[8 + i]}
    }

    this.theme.next(obj);
  }

  setTheme(theme: string) {
    window.localStorage.setItem('theme-key', theme);
    this.id = theme;
    this.key.next(theme);

    this.getScheme(theme).subscribe(theme => {
      this.themeJson = theme;
      this.parseJson();
      this.saveTheme();
    })
  }

  setColorScheme(color: Colors) {
    this.boxcolor = color;
    this.boxColor.next(color);
    this.applyTheme(this.themeParsed)
    this.saveTheme();
  }

  getSchemes() {
    return this.http.get<string[]>(schemaRepository);
  }

  getScheme(scheme: string) {
    return this.http.get<ThemeJson>(schemaRepository + scheme + '.json');
  }
}
