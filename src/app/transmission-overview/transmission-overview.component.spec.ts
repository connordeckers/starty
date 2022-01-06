import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransmissionOverviewComponent } from './transmission-overview.component';

describe('TransmissionOverviewComponent', () => {
  let component: TransmissionOverviewComponent;
  let fixture: ComponentFixture<TransmissionOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransmissionOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransmissionOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
