import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantReservationComponent } from './restaurant-reservation.component';

describe('RestaurantReservationComponent', () => {
  let component: RestaurantReservationComponent;
  let fixture: ComponentFixture<RestaurantReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantReservationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
