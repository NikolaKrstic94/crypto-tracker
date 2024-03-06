import { Component, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { ProfilesAndAssetsStateService } from '../../../../shared/services/profiles-and-assets-state.service';

@Component({
  selector: 'app-profile-list',
  standalone: true,
  imports: [MatListModule],
  templateUrl: './profile-list.component.html',
  styleUrl: './profile-list.component.scss',
})
export class ProfileListComponent {
  profilesAndAssetsStateService = inject(ProfilesAndAssetsStateService);

  profileIds = this.profilesAndAssetsStateService.localStorageGetAllProfileKeys();

}
