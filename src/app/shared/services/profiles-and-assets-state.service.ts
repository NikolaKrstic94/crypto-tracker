import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AssetUserProfile } from '../types/asset-user-profile';

@Injectable({
  providedIn: 'root',
})
export class ProfilesAndAssetsStateService {
  private defaultProfile: AssetUserProfile = {
    profileId: 'defaultProfile',
    assetIds: ['bitcoin', 'ethereum'],
  };

  private initialProfile: AssetUserProfile = JSON.parse(
    localStorage.getItem('profile1') || JSON.stringify(this.defaultProfile)
  );

  localStorageDataSubject = new BehaviorSubject<AssetUserProfile>(this.initialProfile);

  numOfProfiles!: number;

  constructor() {}

  addAsset(assetId: string) {
    const currentProfile = this.localStorageDataSubject.value;
    currentProfile.assetIds?.includes(assetId);
    if (!currentProfile.assetIds?.includes(assetId)) {
      const updatedProfile: AssetUserProfile = {
        ...currentProfile,
        assetIds: [...currentProfile.assetIds, assetId],
      };

      this.updateLocalStorageByProfileId('profile1', updatedProfile);
    }
  }

  private updateLocalStorageByProfileId(key: string, data: AssetUserProfile) {
    localStorage.setItem(key, JSON.stringify(data));
    this.localStorageDataSubject.next(data);
  }
  removeAsset() {
    // TODO
  }

  localStorageGetAllProfileKeys() {
    this.numOfProfiles = localStorage.length;
    const profilesKeys: string[] = [];

    for (let i = 0; i < this.numOfProfiles; i++) {
      profilesKeys.push(localStorage.key(i) as string);
    }
   return profilesKeys;
  }
}
