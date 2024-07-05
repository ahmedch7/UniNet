import { TestBed } from '@angular/core/testing';

import { ReservationRestauService } from './reservation-restau.service';

describe('ReservationRestauService', () => {
  let service: ReservationRestauService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservationRestauService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
