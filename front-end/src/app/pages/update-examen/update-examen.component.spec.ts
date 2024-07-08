import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateExamenComponent } from './update-examen.component';

describe('UpdateExamenComponent', () => {
  let component: UpdateExamenComponent;
  let fixture: ComponentFixture<UpdateExamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateExamenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
