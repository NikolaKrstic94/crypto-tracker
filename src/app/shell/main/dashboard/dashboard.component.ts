import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { map } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { AssetsManagementService } from '../../../shared/services/assets-management.service';
import { AssetCardComponent } from './asset-card/asset-card.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatGridListModule, CommonModule, MatCardModule, AssetCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  breakpointObserver = inject(BreakpointObserver);
  assetsManagerService = inject(AssetsManagementService);
  // TODO get a dynamic currency based on selected currency later
  currencyId = 'USD';
  assets$ = this.assetsManagerService.getAssetsByNumberOfAssets(20);

  cols$ = this.breakpointObserver
    .observe([Breakpoints.HandsetPortrait])
    .pipe(map((result) => (result.matches ? 1 : 4)));

  ngOnInit() {}
}
