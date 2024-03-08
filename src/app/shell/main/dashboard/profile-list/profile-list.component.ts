import { Component, OnInit, inject } from '@angular/core';
import { MatListModule, MatSelectionListChange } from '@angular/material/list';
import { AssetListAndProfilesManagementService } from '../../../../shared/services/asset-list-and-profiles-management/asset-list-and-profiles-management.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddProfileDialogComponent } from './add-profile-dialog/add-profile-dialog.component';

export interface AddProfileDialogData {
  profileName: string;
}

@Component({
  selector: 'app-profile-list',
  standalone: true,
  imports: [MatListModule, CommonModule, MatButtonModule],
  templateUrl: './profile-list.component.html',
  styleUrl: './profile-list.component.scss',
})
export class ProfileListComponent implements OnInit {
  constructor(public dialog: MatDialog) {}
  assetListandProfilesManagementService = inject(AssetListAndProfilesManagementService);

  profiles$ = this.assetListandProfilesManagementService.allProfiles$;
  currentProfile$ = this.assetListandProfilesManagementService.getCurrentProfile$();

  ngOnInit() {}

  addProfile() {
    const dialogRef = this.dialog.open(AddProfileDialogComponent, {});
  }

  setProfileAsActive($event: MatSelectionListChange) {
    const selectedProfileId = $event.options[0].value;

    this.assetListandProfilesManagementService.setProfileAsActive(selectedProfileId);
  }

  removeProfile(profileId: string) {
    this.assetListandProfilesManagementService.removeProfileFromList(profileId);
  }
}
