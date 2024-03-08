import { Component, Inject, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddProfileDialogData } from '../profile-list.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ProfilesAndAssetsStateService } from '../../../../../shared/services/profiles-and-assets-state.service';

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

  profilesAndAssetsStateService = inject(ProfilesAndAssetsStateService);

  profileName!: string;

  addProfile(profileName: string) {
    this.profilesAndAssetsStateService.addProfileToList(profileName);

    this.dialogRef.close();
  }
}
