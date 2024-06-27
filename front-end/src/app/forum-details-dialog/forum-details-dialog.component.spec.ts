import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumDetailsDialogComponent } from './forum-details-dialog.component';

describe('ForumDetailsDialogComponent', () => {
  let component: ForumDetailsDialogComponent;
  let fixture: ComponentFixture<ForumDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumDetailsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForumDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
