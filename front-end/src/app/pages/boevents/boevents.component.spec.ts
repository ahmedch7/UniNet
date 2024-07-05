import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BOEventsComponent } from './boevents.component';

describe('BOEventsComponent', () => {
  let component: BOEventsComponent;
  let fixture: ComponentFixture<BOEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BOEventsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BOEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
