import { Injectable, inject } from '@angular/core';
import { AssetsService } from '../open-api-spec/api/assets.service';
@Injectable({
  providedIn: 'root',
})
export class AssetsManagementService {
  // TODO add API key for more real-life situation
  // connectionService = inject(AssetsService)

  assetsService = inject(AssetsService);
  constructor() {}

  getAssetsByNumberOfAssets(limit: number) {
    return this.assetsService.assets({limit});
  }

  getAssetsBySearchString(search: string) {
    return this.assetsService.assets({search} )
  }

  getAssetsByIds(ids:string[]) {
    return this.assetsService.assets({ids} );
  }

  getAssetById(id: string)  {
    return this.assetsService.assetsId(id);
  }
}
