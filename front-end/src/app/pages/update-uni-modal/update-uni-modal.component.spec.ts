import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUniModalComponent } from './update-uni-modal.component';

describe('UpdateUniModalComponent', () => {
  let component: UpdateUniModalComponent;
  let fixture: ComponentFixture<UpdateUniModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateUniModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateUniModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
