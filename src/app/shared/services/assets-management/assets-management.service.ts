import { Injectable, inject, signal } from '@angular/core';
import { AssetsService } from '../../open-api-spec/api/assets.service';
import { AssetDisplayMode } from '../../types/asset-display-mode';
import { AssetListAndProfilesManagementService } from '../asset-list-and-profiles-management/asset-list-and-profiles-management.service';
import { combineLatest, map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AssetsManagementService {
  assetDisplayMode = signal(AssetDisplayMode.Added);

  assetsService = inject(AssetsService);
  assetListandProfilesManagementService = inject(AssetListAndProfilesManagementService);

  constructor() {}

  getAssetsByNumberOfAssets(limit: number) {
    const currentProfile$ = this.assetListandProfilesManagementService.getCurrentProfile$();
    const allAssets$ = this.assetsService.assets({ limit });

    return combineLatest([currentProfile$, allAssets$]).pipe(
      map(([currentProfile, allAssets]) =>
        allAssets.data?.filter((asset) => {
          return !currentProfile.assetIds.includes(asset.id as string);
        }),
      ),
    );
  }

  getAssetsBySearchString(search: string) {
    return this.assetsService.assets({ search });
  }

  getAssetsByIds(ids: string[]) {
    return this.assetsService.assets({ ids }).pipe(map((assets) => assets.data));
  }

  getAssetById(id: string) {
    return this.assetsService.assetsId(id);
  }

  setAssetDisplayMode(displayMode: AssetDisplayMode) {
    this.assetDisplayMode.set(displayMode);
  }
}
