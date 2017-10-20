import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodnapdiaperkidComponent } from './foodnapdiaperkid.component';

describe('FoodnapdiaperkidComponent', () => {
  let component: FoodnapdiaperkidComponent;
  let fixture: ComponentFixture<FoodnapdiaperkidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodnapdiaperkidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodnapdiaperkidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
