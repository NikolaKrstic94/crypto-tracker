import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AssetUserProfile } from '../types/asset-user-profile';
import { ProfileListComponent } from '../../shell/main/dashboard/profile-list/profile-list.component';

@Injectable({
  providedIn: 'root',
})
export class ProfilesAndAssetsStateService {
  private defaultProfile: AssetUserProfile = {
    profileId: 'defaultProfile',
    assetIds: ['bitcoin', 'ethereum'],
    isCurrent: true,
    isDefault: true,
  };


  allProfilesSubject = new BehaviorSubject<AssetUserProfile[]>([
    this.defaultProfile,
  ]);
  allProfiles$ = this.allProfilesSubject.asObservable();

  numOfProfiles!: number;

  constructor() {}

  getCurrentProfile() {
    let allProfiles: AssetUserProfile[] = this.getAllProfiles();

    return allProfiles.find((profile) => profile.isCurrent);
  }

  private getAllProfiles() {
    this.initializeLocalStorage();
    let allProfiles: AssetUserProfile[] = JSON.parse(localStorage.getItem('profiles') as string);

    return allProfiles;
  }

  // TODO
  // changeProfileToCurrent(profileId: string) {
  //   let allProfiles = this.getAllProfiles();

  //   allProfiles = allProfiles.map((profile: AssetUserProfile) => ({
  //     ...profile,
  //     isCurrent: false,
  //   }));

  // }

  addAsset(assetId: string) {
    const currentProfile = this.getCurrentProfile();

    if (!currentProfile) return;

    if (!currentProfile.assetIds?.includes(assetId)) {
      const updatedProfile: AssetUserProfile = {
        ...currentProfile,
        assetIds: [...currentProfile.assetIds, assetId],
        isCurrent: true,
      };
      const allProfiles = this.getAllProfiles();

      const allProfilesWithUpdatedData = allProfiles.map((profile) =>
        profile.profileId === updatedProfile.profileId ? updatedProfile : profile
      );

      this.updateLocalStorageDataAndSubject(allProfilesWithUpdatedData);
    }
  }

  private updateLocalStorageDataAndSubject(profiles: AssetUserProfile[]) {
    localStorage.setItem('profiles', JSON.stringify(profiles));

    this.allProfilesSubject.next(profiles);
  }
  removeAsset() {
    // TODO
  }

  localStorageGetAllProfileIds() {
    return this.getAllProfiles().map(profile => profile.profileId)
  }

  initializeLocalStorage() {
    let starterData: AssetUserProfile[] = [this.defaultProfile];

    if(!localStorage.getItem('profiles')) {
      this.updateLocalStorageDataAndSubject(starterData)
    }
  }
}
