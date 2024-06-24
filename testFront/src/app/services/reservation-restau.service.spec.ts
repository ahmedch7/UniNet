import { TestBed } from '@angular/core/testing';

import { ReservationRestaurantService } from './reservation-restau.service';

describe('ReservationRestauService', () => {
  let service: ReservationRestaurantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservationRestaurantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
