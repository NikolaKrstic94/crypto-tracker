import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { map } from 'rxjs';
import { assetsDummyData } from '../../../shared/dummy-data/assets-dummy';
import { MatCardModule } from '@angular/material/card';
import { AssetsManagerService } from '../../../shared/services/assets-manager.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatGridListModule, CommonModule, MatCardModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  breakpointObserver = inject(BreakpointObserver);
  assetsManagerService = inject(AssetsManagerService)

  assets = assetsDummyData;

  cols$ = this.breakpointObserver
    .observe([Breakpoints.HandsetPortrait])
    .pipe(map((result) => (result.matches ? 1 : 4)));

  ngOnInit() {
    this.assetsManagerService.getAssets();
    this.assetsManagerService.getAssetById("ethereum");
  }
}
