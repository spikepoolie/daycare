import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodnapdiaperComponent } from './foodnapdiaper.component';

describe('FoodnapdiaperComponent', () => {
  let component: FoodnapdiaperComponent;
  let fixture: ComponentFixture<FoodnapdiaperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodnapdiaperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodnapdiaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
