import { TestBed } from '@angular/core/testing';

import { ProfilesAndAssetsStateService } from './profiles-and-assets-state.service';

describe('ProfilesAndAssetsStateService', () => {
  let service: ProfilesAndAssetsStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfilesAndAssetsStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
