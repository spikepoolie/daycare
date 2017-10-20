import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewkidregistrationComponent } from './newkidregistration.component';

describe('NewkidregistrationComponent', () => {
  let component: NewkidregistrationComponent;
  let fixture: ComponentFixture<NewkidregistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewkidregistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewkidregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
