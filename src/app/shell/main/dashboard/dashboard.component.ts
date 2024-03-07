import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AssetGridContainerComponent } from './asset-grid-container/asset-grid-container.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AssetDisplayMode } from '../../../shared/types/asset-display-mode';
import { ProfileListComponent } from './profile-list/profile-list.component';
import { AssetsManagementService } from '../../../shared/services/assets-management-service/assets-management.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AssetGridContainerComponent, MatToolbarModule, MatButtonModule, ProfileListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  constructor( public dialog: MatDialog) {}
  assetsManagementService = inject(AssetsManagementService)

  matDialogRef!:MatDialogRef<AssetGridContainerComponent, any>

  openAssetDialog() {
    this.matDialogRef = this.dialog.open(AssetGridContainerComponent, {
      width: '100rem',
      height: '50rem',
      data: {
        isDialog: true
      }
    })

    this.matDialogRef.afterOpened().subscribe(() => {
      this.assetsManagementService.setAssetDisplayMode(AssetDisplayMode.Available)
    })

    this.matDialogRef.afterClosed().subscribe(() => {
      this.assetsManagementService.setAssetDisplayMode(AssetDisplayMode.Added)
    })
  }

  ngOnInit() {

  }
}
