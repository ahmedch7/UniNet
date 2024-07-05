import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPostCandidatureComponent } from './user-post-candidature.component';

describe('UserPostCandidatureComponent', () => {
  let component: UserPostCandidatureComponent;
  let fixture: ComponentFixture<UserPostCandidatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPostCandidatureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPostCandidatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
