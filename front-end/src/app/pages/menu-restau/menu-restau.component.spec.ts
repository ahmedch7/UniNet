import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuRestauComponent } from './menu-restau.component';

describe('MenuRestauComponent', () => {
  let component: MenuRestauComponent;
  let fixture: ComponentFixture<MenuRestauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuRestauComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuRestauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
