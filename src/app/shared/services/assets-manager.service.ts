import { Injectable, inject } from '@angular/core';
import { AssetsService } from '../open-api-spec/api/assets.service';
@Injectable({
  providedIn: 'root',
})
export class AssetsManagerService {
  // TODO add API key for more real-life situation
  // connectionService = inject(AssetsService)

  assetsService = inject(AssetsService);
  constructor() {}

  getAssets() {
    this.assetsService.assets({search:'tether'} ).subscribe((response) => {
      console.log(response);
    });
  }


  // Observable<InlineResponse2001>
  getAssetById(id: string)  {
    this.assetsService.assetsId(id).subscribe((response) => console.log(response));
  }
}
