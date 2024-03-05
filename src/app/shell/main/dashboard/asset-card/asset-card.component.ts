import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { InlineResponse200DataInner } from '../../../../shared/open-api-spec/model/inlineResponse200DataInner';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-asset-card',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatButtonModule],
  templateUrl: './asset-card.component.html',
  styleUrl: './asset-card.component.scss',
})
export class AssetCardComponent implements OnInit {
  @Input() assetData!: InlineResponse200DataInner;
  @Input() currencyId!: string;

  pathToIcon!: string;
  iconNameToLowerCase!: string;
  altName!: string;

  ngOnInit() {
    this.setIconPath();
  }

  private setIconPath() {
    if (this.assetData.symbol && this.assetData.name) {
      this.iconNameToLowerCase = this.assetData.symbol?.toLowerCase();
      this.pathToIcon = `https://assets.coincap.io/assets/icons/${this.iconNameToLowerCase}@2x.png`;
      this.altName = this.assetData.name;
    }
  }
}
