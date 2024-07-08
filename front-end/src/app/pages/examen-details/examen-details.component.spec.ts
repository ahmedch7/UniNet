import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenDetailsComponent } from './examen-details.component';

describe('ExamenDetailsComponent', () => {
  let component: ExamenDetailsComponent;
  let fixture: ComponentFixture<ExamenDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamenDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamenDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
