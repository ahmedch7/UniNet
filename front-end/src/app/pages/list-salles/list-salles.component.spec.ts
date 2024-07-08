import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSallesComponent } from './list-salles.component';

describe('ListSallesComponent', () => {
  let component: ListSallesComponent;
  let fixture: ComponentFixture<ListSallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSallesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
