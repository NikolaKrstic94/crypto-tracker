import { Injectable, inject, signal } from '@angular/core';
import { AssetsService } from '../../open-api-spec/api/assets.service';
import { AssetDisplayMode } from '../../types/asset-display-mode';
@Injectable({
  providedIn: 'root',
})
export class AssetsManagementService {
  // TODO add API key for more real-life situation
  // connectionService = inject(AssetsService)

  assetDisplayMode = AssetDisplayMode.Added;

  assetsService = inject(AssetsService);
  constructor() {}

  getAssetsByNumberOfAssets(limit: number) {
    return this.assetsService.assets({ limit });
  }

  getAssetsBySearchString(search: string) {
    return this.assetsService.assets({ search });
  }

  getAssetsByIds(ids: string[]) {
    return this.assetsService.assets({ ids });
  }

  getAssetById(id: string) {
    return this.assetsService.assetsId(id);
  }

  setAssetDisplayMode(displayMode: AssetDisplayMode) {
    this.assetDisplayMode = displayMode;
  }
}
