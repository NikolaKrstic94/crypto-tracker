import { Component, OnInit, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { ProfilesAndAssetsStateService } from '../../../../shared/services/profiles-and-assets-state.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-list',
  standalone: true,
  imports: [MatListModule, CommonModule],
  templateUrl: './profile-list.component.html',
  styleUrl: './profile-list.component.scss',
})
export class ProfileListComponent implements OnInit {
  profilesAndAssetsStateService = inject(ProfilesAndAssetsStateService);

  profiles$ = this.profilesAndAssetsStateService.allProfiles$;

  ngOnInit() {
    this.profilesAndAssetsStateService.initializeLocalStorage();
  }

}
