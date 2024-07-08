import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendrierExamensComponent } from './calendrier-examens.component';

describe('CalendrierExamensComponent', () => {
  let component: CalendrierExamensComponent;
  let fixture: ComponentFixture<CalendrierExamensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendrierExamensComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendrierExamensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
