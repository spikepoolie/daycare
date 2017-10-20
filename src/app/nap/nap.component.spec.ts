import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NapComponent } from './nap.component';

describe('NapComponent', () => {
  let component: NapComponent;
  let fixture: ComponentFixture<NapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
