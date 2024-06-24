import { TestBed } from '@angular/core/testing';

import { PreOrdreService } from './pre-ordre.service';

describe('PreOrdreService', () => {
  let service: PreOrdreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreOrdreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
