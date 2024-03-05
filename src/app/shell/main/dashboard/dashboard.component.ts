import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AssetGridContainerComponent } from './asset-grid-container/asset-grid-container.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AssetGridContainerComponent, MatToolbarModule, MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {}
