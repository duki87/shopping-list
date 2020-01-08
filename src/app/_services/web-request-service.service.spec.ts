import { TestBed } from '@angular/core/testing';

import { WebRequestServiceService } from './web-request-service.service';

describe('WebRequestServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WebRequestServiceService = TestBed.get(WebRequestServiceService);
    expect(service).toBeTruthy();
  });
});
