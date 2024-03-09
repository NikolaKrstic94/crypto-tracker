import { TestBed } from '@angular/core/testing';

import { RatesManagementService } from './rates-management.service';

describe('RatesManagementService', () => {
  let service: RatesManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RatesManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
