import { TestBed } from '@angular/core/testing';

import { CommentRestauService } from './comment-restau.service';

describe('CommentRestauService', () => {
  let service: CommentRestauService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentRestauService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
