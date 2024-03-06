import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AssetGridContainerComponent } from './asset-grid-container/asset-grid-container.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AssetDisplayMode } from '../../../shared/types/asset-display-mode';
import { ProfileListComponent } from './profile-list/profile-list.component';
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

  openAssetDialog() {
    this.dialog.open(AssetGridContainerComponent, {
      width: '100rem',
      height: '50rem',
      data: {
        assetDisplayMode: AssetDisplayMode.Available,
        isDialog: true
      }
    })
  }
}
