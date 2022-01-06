import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-dash-panel',
  templateUrl: './dash-panel.component.html',
  styleUrls: ['./dash-panel.component.scss']
})
export class DashPanelComponent implements OnInit, OnChanges {
  @Input() height: string = "1";
  @Input() width: string = "1";

  @Input() src?: string;

  constructor(private elRef: ElementRef) {}

  private updateSizing() {
    const self = this.elRef.nativeElement;

    self.style.setProperty('--width', `span ${this.width}`);
    self.style.setProperty('--height', `span ${this.height}`);
  }

  ngOnInit() {this.updateSizing();}
  ngOnChanges(changes: SimpleChanges) {this.updateSizing();}
}
