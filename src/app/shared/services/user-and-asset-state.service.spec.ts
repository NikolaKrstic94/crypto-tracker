import { TestBed } from '@angular/core/testing';

import { UserAndAssetStateService } from './user-and-asset-state.service';

describe('UserAndAssetStateService', () => {
  let service: UserAndAssetStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAndAssetStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
