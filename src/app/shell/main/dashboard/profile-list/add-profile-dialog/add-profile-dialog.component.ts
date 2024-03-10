import { Component, Inject, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AssetListAndProfilesManagementService } from '../../../../../shared/services/asset-list-and-profiles-management/asset-list-and-profiles-management.service';
import { AddProfileDialogData } from '../../../../../shared/types/add-profile-dialog-data';

@Component({
  selector: 'app-add-profile-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatFormFieldModule,
    MatDialogActions,
    MatDialogClose,
    FormsModule,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './add-profile-dialog.component.html',
  styleUrl: './add-profile-dialog.component.scss',
})
export class AddProfileDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AddProfileDialogComponent, any>,
    @Inject(MAT_DIALOG_DATA) public data: AddProfileDialogData,
  ) {}

  assetListandProfilesManagementService = inject(AssetListAndProfilesManagementService);

  profileName!: string;

  addProfile(profileName: string) {
    this.assetListandProfilesManagementService.addProfileToList(profileName);

    this.dialogRef.close();
  }
}
