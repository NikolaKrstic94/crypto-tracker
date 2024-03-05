import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { AssetCardComponent } from '../../asset-card/asset-card.component';
import { InlineResponse200 } from '../../../../../shared/open-api-spec/model/inlineResponse200';

@Component({
  selector: 'app-asset-grid-representation',
  standalone: true,
  imports: [MatGridListModule, CommonModule, MatCardModule, AssetCardComponent],
  templateUrl: './asset-grid-representation.component.html',
  styleUrl: './asset-grid-representation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssetGridRepresentationComponent {
  @Input() assets!: InlineResponse200;
  @Input() cols: number | null = 4;
  @Input() currencyId: string = '';
}
