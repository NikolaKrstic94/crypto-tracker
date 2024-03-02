import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { map } from 'rxjs';
import { assetsDummyData } from '../../../shared/dummy-data/assets-dummy';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatGridListModule, CommonModule, MatCardModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  breakpointObserver = inject(BreakpointObserver);

  assets = assetsDummyData;

  cols$ = this.breakpointObserver
    .observe([Breakpoints.HandsetPortrait])
    .pipe(map((result) => (result.matches ? 1 : 4)));
}
