import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndiaStatsComponent } from './india-stats.component';

describe('IndiaStatsComponent', () => {
  let component: IndiaStatsComponent;
  let fixture: ComponentFixture<IndiaStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndiaStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndiaStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
