import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AssetsManagementService } from '../../../../shared/services/assets-management.service';
import { map } from 'rxjs';
import { AssetGridRepresentationComponent } from './asset-grid-representation/asset-grid-representation.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-asset-grid-container',
  standalone: true,
  imports: [AssetGridRepresentationComponent, CommonModule],
  templateUrl: './asset-grid-container.component.html',
  styleUrl: './asset-grid-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssetGridContainerComponent {
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

  constructor() {}
}
