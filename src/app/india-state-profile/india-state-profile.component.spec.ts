import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndiaStateProfileComponent } from './india-state-profile.component';

describe('IndiaStateProfileComponent', () => {
  let component: IndiaStateProfileComponent;
  let fixture: ComponentFixture<IndiaStateProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndiaStateProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndiaStateProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
