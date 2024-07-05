import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NiveauedudetailComponent } from './niveauedudetail.component';

describe('NiveauedudetailComponent', () => {
  let component: NiveauedudetailComponent;
  let fixture: ComponentFixture<NiveauedudetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NiveauedudetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NiveauedudetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
