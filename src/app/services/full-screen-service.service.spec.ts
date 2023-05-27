import { TestBed } from '@angular/core/testing';

import { FullScreenServiceService } from './full-screen-service.service';

describe('FullScreenServiceService', () => {
  let service: FullScreenServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FullScreenServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
