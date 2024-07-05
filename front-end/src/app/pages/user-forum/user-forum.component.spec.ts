import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserForumComponent } from './user-forum.component';

describe('UserForumComponent', () => {
  let component: UserForumComponent;
  let fixture: ComponentFixture<UserForumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserForumComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
