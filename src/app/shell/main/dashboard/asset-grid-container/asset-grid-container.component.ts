import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, Inject, Optional, inject } from '@angular/core';
import { AssetsManagementService } from '../../../../shared/services/assets-management/assets-management.service';
import { Observable, combineLatest, map, of, switchMap, timer } from 'rxjs';
import { AssetGridRepresentationComponent } from './asset-grid-representation/asset-grid-representation.component';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogContent } from '@angular/material/dialog';
import { AssetListAndProfilesManagementService } from '../../../../shared/services/asset-list-and-profiles-management/asset-list-and-profiles-management.service';
import { InlineResponse200DataInner } from '../../../../shared/open-api-spec/model/inlineResponse200DataInner';
import { AssetsPriceUpdateService } from '../../../../shared/services/assets-price-update/assets-price-update.service';
import { RatesManagementService } from '../../../../shared/services/rates-management/rates-management.service';

@Component({
  selector: 'app-asset-grid-container',
  standalone: true,
  imports: [AssetGridRepresentationComponent, CommonModule, MatDialogContent],
  templateUrl: './asset-grid-container.component.html',
  styleUrl: './asset-grid-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssetGridContainerComponent {
  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public dialogData: any) {}
  breakpointObserver = inject(BreakpointObserver);
  assetsManagerService = inject(AssetsManagementService);
  assetListandProfilesManagementService = inject(AssetListAndProfilesManagementService);
  assetsPriceUpdateService = inject(AssetsPriceUpdateService);
  ratesManagementService = inject(RatesManagementService);

  livePrices$ = this.assetsPriceUpdateService.prices$;
  currentProfile$ = this.assetListandProfilesManagementService.getCurrentProfile$();
  selectedCurrency$ = this.ratesManagementService.selectedCurrency$;
  pageSizeAndPageOptions$ = this.assetListandProfilesManagementService.pageSizeAndPageOptions$;

  timeBetweenGetAssetsRequests = 5000;
  pageSizeOptionsMobile = [3, 6, 9, 12];
  pageSizeOptionsDesktop = [4, 8, 12, 16];

  cols$ = this.breakpointObserver
    .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
    .pipe(
      map((result) => {
        const breakpoints = [
          { breakpoint: Breakpoints.XSmall, cols: 1, pageSize: 3, pageSizeOptions: this.pageSizeOptionsMobile },
          { breakpoint: Breakpoints.Small, cols: 2, pageSize: 6, pageSizeOptions: this.pageSizeOptionsMobile },
          { breakpoint: Breakpoints.Medium, cols: 3, pageSize: 9, pageSizeOptions: this.pageSizeOptionsMobile },
          { breakpoint: Breakpoints.Large, cols: 4, pageSize: 16, pageSizeOptions: this.pageSizeOptionsDesktop },
          { breakpoint: Breakpoints.XLarge, cols: 4, pageSize: 16, pageSizeOptions: this.pageSizeOptionsDesktop },
        ];

        const activeBreakpoint = breakpoints.find((bp) => result.breakpoints[bp.breakpoint]);
        const pageSizeArray = activeBreakpoint?.pageSizeOptions;
        this.assetListandProfilesManagementService.setPageSize(activeBreakpoint?.pageSize, pageSizeArray);

        return activeBreakpoint ? activeBreakpoint.cols : 4;
      }),
    );
  /**
   * Gets the appropriate assets based on whether they are needed in a dashboard or in a dialog
   */
  appropriateAssets: Observable<InlineResponse200DataInner[] | undefined> = combineLatest([
    timer(0, this.timeBetweenGetAssetsRequests),
    this.currentProfile$,
    this.pageSizeAndPageOptions$,
  ]).pipe(
    switchMap(([_, currentProfile]) => {
      if (!this.dialogData && currentProfile.assetIds.length) {
        return this.assetsManagerService.getAssetsByIds(currentProfile.assetIds);
      } else if (this.dialogData) {
        return this.assetsManagerService.getAssetsByNumberOfAssets(2000);
      } else {
        return of([]);
      }
    }),
  );

  assets$: Observable<InlineResponse200DataInner[] | undefined> = combineLatest([
    this.appropriateAssets,
    this.livePrices$,
    this.selectedCurrency$,
  ]).pipe(
    map(([assets, livePrices, selectedCurrency]) => {
      if (!assets) {
        return undefined;
      }
      return assets.map((asset) => {
        const priceUsd = livePrices[asset.id as string] || asset.priceUsd || 0;
        const exchangeRate = selectedCurrency.rateUsd;

        const price = parseFloat(priceUsd) / parseFloat(exchangeRate || '1');

        return { ...asset, priceUsd: price.toFixed(2) };
      });
    }),
  );
}
