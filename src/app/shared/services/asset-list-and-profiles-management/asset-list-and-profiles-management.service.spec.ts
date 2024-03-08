import { TestBed } from '@angular/core/testing';

import { AssetListAndProfilesManagementService } from './asset-list-and-profiles-management.service';

describe('AssetListAndProfilesManagementService', () => {
  let service: AssetListAndProfilesManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetListAndProfilesManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
