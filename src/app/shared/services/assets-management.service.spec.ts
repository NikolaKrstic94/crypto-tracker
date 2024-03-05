import { TestBed } from '@angular/core/testing';
import { AssetsManagementService } from './assets-management.service';


describe('ConnectionService', () => {
  let service: AssetsManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetsManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
