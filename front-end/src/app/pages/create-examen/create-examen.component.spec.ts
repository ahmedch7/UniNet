import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateExamenComponent } from './create-examen.component';

describe('CreateExamenComponent', () => {
  let component: CreateExamenComponent;
  let fixture: ComponentFixture<CreateExamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateExamenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
