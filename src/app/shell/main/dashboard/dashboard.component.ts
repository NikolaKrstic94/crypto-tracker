import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { map } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { AssetsManagerService } from '../../../shared/services/assets-manager.service';

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

  assets$ = this.assetsManagerService.getFirstHundredAssets() ;

  cols$ = this.breakpointObserver
    .observe([Breakpoints.HandsetPortrait])
    .pipe(map((result) => (result.matches ? 1 : 4)));

  ngOnInit() {

  }
}
