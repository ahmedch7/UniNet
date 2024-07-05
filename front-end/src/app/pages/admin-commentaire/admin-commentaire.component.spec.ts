import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCommentaireComponent } from './admin-commentaire.component';

describe('AdminCommentaireComponent', () => {
  let component: AdminCommentaireComponent;
  let fixture: ComponentFixture<AdminCommentaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCommentaireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCommentaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
