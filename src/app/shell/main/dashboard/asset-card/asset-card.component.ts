import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { InlineResponse200DataInner } from '../../../../shared/open-api-spec/model/inlineResponse200DataInner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-asset-card',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './asset-card.component.html',
  styleUrl: './asset-card.component.scss'
})
export class AssetCardComponent {
  @Input() assetData!: InlineResponse200DataInner;
  @Input() currencyId!: string;
}
