import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter, map } from 'rxjs';
import { AssetUserProfile } from '../types/asset-user-profile';
import { ProfileListComponent } from '../../shell/main/dashboard/profile-list/profile-list.component';

@Injectable({
  providedIn: 'root',
})
export class ProfilesAndAssetsStateService {
  private defaultProfile: AssetUserProfile = {
    profileId: 'defaultProfile',
    assetIds: ['bitcoin'],
    isCurrent: true,
    isDefault: true,
  };

  allProfilesSubject = new BehaviorSubject<AssetUserProfile[]>(this.getAllProfiles());
  allProfiles$ = this.allProfilesSubject.asObservable();

  numOfProfiles!: number;

  constructor() {}

  getCurrentProfile() {
    let allProfiles: AssetUserProfile[] = this.getAllProfiles();

    return allProfiles.find((profile) => profile.isCurrent);
  }

  getCurrentProfile$(): Observable<AssetUserProfile> {
    return this.allProfiles$.pipe(
      map((profiles) => profiles.find((profile) => profile.isCurrent)),
      filter((profile) => profile !== undefined)
    ) as Observable<AssetUserProfile>;
  }

  private getAllProfiles() {
    this.initializeLocalStorage();
    let allProfiles: AssetUserProfile[] = JSON.parse(localStorage.getItem('profiles') as string);

    return allProfiles;
  }

  // TODO
  /*
    changeProfileToCurrent(profileId: string) {
    let allProfiles = this.getAllProfiles();

    allProfiles = allProfiles.map((profile: AssetUserProfile) => ({
      ...profile,
      isCurrent: false,
    }));

  } */

  addAsset(assetId: string) {
    const currentProfile = this.getCurrentProfile();

    if (!currentProfile) {
      console.error("There's no selected user to add asset to");
      return;
    }

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

  removeAsset(assetId: string) {
    const currentProfile = this.getCurrentProfile();

    if (!currentProfile) {
      console.error("There's no selected user to remove asset from");
      return;
    }

    if (currentProfile.assetIds?.includes(assetId)) {
      const updatedProfile: AssetUserProfile = {
        ...currentProfile,
        assetIds: [...currentProfile.assetIds.filter((asset) => asset !== assetId)],
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

    if (this.allProfilesSubject) {
      this.allProfilesSubject.next(profiles);
    }
  }

  localStorageGetAllProfileIds() {
    return this.getAllProfiles().map((profile) => profile.profileId);
  }

  initializeLocalStorage() {
    if (!localStorage.getItem('profiles')) {
      let starterData: AssetUserProfile[] = [this.defaultProfile];
      this.updateLocalStorageDataAndSubject(starterData);
    }
  }
}
