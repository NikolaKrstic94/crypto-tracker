import { TestBed } from '@angular/core/testing';

import { AssetsPriceUpdateService } from './assets-price-update.service';

describe('AssetsPriceUpdateService', () => {
  let service: AssetsPriceUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetsPriceUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
