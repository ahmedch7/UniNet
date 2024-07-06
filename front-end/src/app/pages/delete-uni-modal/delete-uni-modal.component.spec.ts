import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUniModalComponent } from './delete-uni-modal.component';

describe('DeleteUniModalComponent', () => {
  let component: DeleteUniModalComponent;
  let fixture: ComponentFixture<DeleteUniModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteUniModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteUniModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
