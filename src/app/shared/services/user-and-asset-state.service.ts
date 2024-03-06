import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AssetUserProfile } from '../types/asset-user-profile';

@Injectable({
  providedIn: 'root',
})
export class UserAndAssetStateService {
  private defaultProfile: AssetUserProfile = {
    userId: 'defaultUser',
    assetIds: ['bitcoin', 'ethereum'],
  };

  private initialProfile: AssetUserProfile = JSON.parse(
    localStorage.getItem('user1') || JSON.stringify(this.defaultProfile)
  );

  localStorageDataSubject = new BehaviorSubject<AssetUserProfile>(this.initialProfile);

  numOfUsers!: number;

  constructor() {}

  addAsset(assetId: string) {
    const currentProfile = this.localStorageDataSubject.value;
    currentProfile.assetIds?.includes(assetId);
    if (!currentProfile.assetIds?.includes(assetId)) {
      const updatedProfile: AssetUserProfile = {
        ...currentProfile,
        assetIds: [...currentProfile.assetIds, assetId],
      };

      this.updateLocalStorageByUserId('user1', updatedProfile);
    }
  }

  private updateLocalStorageByUserId(key: string, data: AssetUserProfile) {
    localStorage.setItem(key, JSON.stringify(data));
    this.localStorageDataSubject.next(data);
  }
  removeAsset() {
    // TODO
  }

  localStorageGetAllUserKeys() {
    this.numOfUsers = localStorage.length;
    const usersKeys: string[] = [];

    for (let i = 0; i < this.numOfUsers; i++) {
      usersKeys.push(localStorage.key(i) as string);
    }
   return usersKeys;
  }
}
