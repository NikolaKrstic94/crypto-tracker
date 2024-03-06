import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, Inject, Optional, inject } from '@angular/core';
import { AssetsManagementService } from '../../../../shared/services/assets-management-service/assets-management.service';
import { map } from 'rxjs';
import { AssetGridRepresentationComponent } from './asset-grid-representation/asset-grid-representation.component';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogContent } from '@angular/material/dialog';
import { AssetDisplayMode } from '../../../../shared/types/asset-display-mode';

@Component({
  selector: 'app-asset-grid-container',
  standalone: true,
  imports: [AssetGridRepresentationComponent, CommonModule, MatDialogContent],
  templateUrl: './asset-grid-container.component.html',
  styleUrl: './asset-grid-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssetGridContainerComponent {
  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public dialogData: any) {
    if (dialogData) {
      this.assetsManagerService.setAssetDisplayMode(AssetDisplayMode.Available);
    }
  }
  breakpointObserver = inject(BreakpointObserver);
  assetsManagerService = inject(AssetsManagementService);
  currencyId = 'USD';

  cols$ = this.breakpointObserver
    .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large])
    .pipe(
      map((result) => {
        const breakpoints = [
          { breakpoint: Breakpoints.XSmall, cols: 1 },
          { breakpoint: Breakpoints.Small, cols: 2 },
          { breakpoint: Breakpoints.Medium, cols: 3 },
          { breakpoint: Breakpoints.Large, cols: 4 },
        ];

        const activeBreakpoint = breakpoints.find((bp) => result.breakpoints[bp.breakpoint]);
        return activeBreakpoint ? activeBreakpoint.cols : 4;
      })
    );

  assets$ = this.assetsManagerService.getAssetsByNumberOfAssets(16);
}
