import { TestBed } from '@angular/core/testing';

import { MenuRestauService } from './menu-restau.service';

describe('MenuRestauService', () => {
  let service: MenuRestauService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuRestauService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
