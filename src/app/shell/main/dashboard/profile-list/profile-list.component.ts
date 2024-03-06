import { Component, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { AssetUserProfile } from '../../../../shared/types/asset-user-profile';
import { UserAndAssetStateService } from '../../../../shared/services/user-and-asset-state.service';

@Component({
  selector: 'app-profile-list',
  standalone: true,
  imports: [MatListModule],
  templateUrl: './profile-list.component.html',
  styleUrl: './profile-list.component.scss',
})
export class ProfileListComponent {
  userIds!: string[];
  userAndAssetStateService = inject(UserAndAssetStateService);

  localStorageGetAllUserKeys() {
    this.userIds = this.userAndAssetStateService.localStorageGetAllUserKeys();
  }
}
