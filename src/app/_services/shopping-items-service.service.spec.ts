import { TestBed } from '@angular/core/testing';

import { ShoppingItemsServiceService } from './shopping-items-service.service';

describe('ShoppingItemsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShoppingItemsServiceService = TestBed.get(ShoppingItemsServiceService);
    expect(service).toBeTruthy();
  });
});
