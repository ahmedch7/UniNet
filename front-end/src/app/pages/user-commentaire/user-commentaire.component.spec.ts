import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCommentaireComponent } from './user-commentaire.component';

describe('UserCommentaireComponent', () => {
  let component: UserCommentaireComponent;
  let fixture: ComponentFixture<UserCommentaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCommentaireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCommentaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
