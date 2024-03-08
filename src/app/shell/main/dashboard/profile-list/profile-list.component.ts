import { Component, OnInit, inject } from '@angular/core';
import { MatListModule, MatSelectionListChange } from '@angular/material/list';
import { ProfilesAndAssetsStateService } from '../../../../shared/services/profiles-and-assets-state.service';
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
  profilesAndAssetsStateService = inject(ProfilesAndAssetsStateService);

  profiles$ = this.profilesAndAssetsStateService.allProfiles$;
  currentProfile$ = this.profilesAndAssetsStateService.getCurrentProfile$();

  ngOnInit() {}

  addProfile() {
    const dialogRef = this.dialog.open(AddProfileDialogComponent, {});
  }

  setProfileAsActive($event: MatSelectionListChange) {
    const selectedProfileId = $event.options[0].value;

    this.profilesAndAssetsStateService.setProfileAsActive(selectedProfileId);
  }

  removeProfile(profileId: string) {
    this.profilesAndAssetsStateService.removeProfileFromList(profileId);
  }
}
