import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter, map } from 'rxjs';
import { AssetUserProfile } from '../../types/asset-user-profile';
import { PageSizeAndPageOptions } from '../../types/page-size-and-page-options';
@Injectable({
  providedIn: 'root',
})

export class AssetListAndProfilesManagementService {
  private defaultProfile: AssetUserProfile = this.createDefaultProfile();

  allProfilesSubject = new BehaviorSubject<AssetUserProfile[]>(this.getAllProfiles());
  allProfiles$ = this.allProfilesSubject.asObservable();
  private pageSizeSubject = new BehaviorSubject<PageSizeAndPageOptions>({pageSize:16, pageOptions:[4,8,12,16]});
  pageSizeAndPageOptions$ = this.pageSizeSubject.asObservable();

  constructor() {}

  private createDefaultProfile(): AssetUserProfile {
    return {
      profileId: crypto.randomUUID(),
      name: 'Default Profile',
      assetIds: ['bitcoin'],
      isCurrent: true,
      isDefault: true,
    };
  }

  private getCurrentProfile() {
    let allProfiles: AssetUserProfile[] = this.getAllProfiles();

    return allProfiles.find((profile) => profile.isCurrent);
  }

  getCurrentProfile$(): Observable<AssetUserProfile> {
    return this.allProfiles$.pipe(
      map((profiles) => profiles.find((profile) => profile.isCurrent)),
      filter((profile) => profile !== undefined),
    ) as Observable<AssetUserProfile>;
  }

  private getAllProfiles() {
    this.initializeLocalStorage();
    let allProfiles: AssetUserProfile[] = JSON.parse(localStorage.getItem('profiles') as string);

    return allProfiles;
  }

  addProfileToList(profileName: string) {
    const userProfileToAdd: AssetUserProfile = this.initializeNewProfileObj(profileName);

    const allProfiles = this.getAllProfiles();

    let updatedAllProfiles = [...allProfiles, userProfileToAdd];

    this.updateLocalStorageAndSubjectData(updatedAllProfiles);

    this.setProfileAsActive(userProfileToAdd.profileId);
  }

  removeProfileFromList(profileId: string) {
    let allProfiles = this.getAllProfiles();

    let updatedProfiles = allProfiles.filter((profile) => {
      const isDefaultProfile = profile.isDefault;
      if (isDefaultProfile) {
        return true;
      } else {
        return profile.profileId !== profileId;
      }
    });
    this.updateLocalStorageAndSubjectData(updatedProfiles);

    this.setProfileAsActive(updatedProfiles[0].profileId);
  }

  setProfileAsActive(activeProfileId: string) {
    let allProfiles = this.getAllProfiles();

    allProfiles = this.resetAllProfilesCurrentStatus(allProfiles);

    allProfiles = allProfiles.map((profile) => {
      if (profile.profileId === activeProfileId) {
        return { ...profile, isCurrent: true };
      }
      return profile;
    });

    this.updateLocalStorageAndSubjectData(allProfiles);
  }

  private initializeNewProfileObj(profileName: string = 'No-name Profile'): AssetUserProfile {
    let defaultName = profileName;

    return {
      name: defaultName,
      profileId: crypto.randomUUID(),
      assetIds: this.defaultProfile.assetIds,
      isCurrent: true,
      isDefault: false,
    };
  }

  private resetAllProfilesCurrentStatus(allProfiles: AssetUserProfile[]) {
    allProfiles = allProfiles.map((profile) => {
      return { ...profile, isCurrent: false };
    });
    return allProfiles;
  }

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
        profile.profileId === updatedProfile.profileId ? updatedProfile : profile,
      );

      this.updateLocalStorageAndSubjectData(allProfilesWithUpdatedData);
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
        profile.profileId === updatedProfile.profileId ? updatedProfile : profile,
      );

      this.updateLocalStorageAndSubjectData(allProfilesWithUpdatedData);
    }
  }

  private updateLocalStorageAndSubjectData(profiles: AssetUserProfile[]) {
    localStorage.setItem('profiles', JSON.stringify(profiles));

    if (this.allProfilesSubject) {
      this.allProfilesSubject.next(profiles);
    }
  }

  initializeLocalStorage() {
    let profilesArray: AssetUserProfile[] = JSON.parse(localStorage.getItem('profiles')!);

    if (!profilesArray || profilesArray.length === 0) {
      let starterData: AssetUserProfile[] = [this.defaultProfile];
      this.updateLocalStorageAndSubjectData(starterData);
    }
  }

  setPageSize(pageSize: number | undefined = 16, pageSizeOptions: number[] | undefined) {
    if (!pageSize || !pageSizeOptions) {
      console.error('pageSize is undefined');
      return;
    }
    this.pageSizeSubject.next({pageSize, pageOptions: pageSizeOptions});
  }
}
