import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { AssetCardComponent } from './asset-card/asset-card.component';
import { InlineResponse200DataInner } from '../../../../../shared/open-api-spec/model/inlineResponse200DataInner';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-asset-grid-representation',
  standalone: true,
  imports: [MatGridListModule, CommonModule, MatCardModule, AssetCardComponent,MatFormFieldModule],
  templateUrl: './asset-grid-representation.component.html',
  styleUrl: './asset-grid-representation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssetGridRepresentationComponent {
  @Input() assets!: InlineResponse200DataInner[] | undefined;
  @Input() cols: number | null = 4;
  @Input() currencyId: string = '';

  ngAfterViewInit() {
    console.log("🚀  this.assets:", this.assets)
  }
}
