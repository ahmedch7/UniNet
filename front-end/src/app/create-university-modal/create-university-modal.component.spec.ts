import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUniversityModalComponent } from './create-university-modal.component';

describe('CreateUniversityModalComponent', () => {
  let component: CreateUniversityModalComponent;
  let fixture: ComponentFixture<CreateUniversityModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUniversityModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUniversityModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
