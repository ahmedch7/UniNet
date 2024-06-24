import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreodreComponent } from './preodre.component';

describe('PreodreComponent', () => {
  let component: PreodreComponent;
  let fixture: ComponentFixture<PreodreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreodreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreodreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
