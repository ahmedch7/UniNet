import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPostCandidatureComponent } from './admin-post-candidature.component';

describe('AdminPostCandidatureComponent', () => {
  let component: AdminPostCandidatureComponent;
  let fixture: ComponentFixture<AdminPostCandidatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPostCandidatureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPostCandidatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
