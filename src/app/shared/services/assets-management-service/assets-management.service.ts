import { Injectable, inject, signal } from '@angular/core';
import { AssetsService } from '../../open-api-spec/api/assets.service';
import { AssetDisplayMode } from '../../types/asset-display-mode';
import { ProfilesAndAssetsStateService } from '../profiles-and-assets-state.service';
import { combineLatest, map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AssetsManagementService {
  // TODO add API key for more real-life situation
  // connectionService = inject(AssetsService)

  assetDisplayMode = signal(AssetDisplayMode.Added);

  assetsService = inject(AssetsService);
  profilesAndAssetsStateService = inject(ProfilesAndAssetsStateService);

  constructor() {}

  getAssetsByNumberOfAssets(limit: number) {
    const currentProfile$ = this.profilesAndAssetsStateService.getCurrentProfile$();
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
