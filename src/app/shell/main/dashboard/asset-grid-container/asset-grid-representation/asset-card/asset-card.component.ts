import { Component, Input, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { InlineResponse200DataInner } from '../../../../../../shared/open-api-spec/model/inlineResponse200DataInner';
import { AssetsManagementService } from '../../../../../../shared/services/assets-management-service/assets-management.service';
import { AssetDisplayMode } from '../../../../../../shared/types/asset-display-mode';
import { UserAndAssetStateService } from '../../../../../../shared/services/user-and-asset-state.service';

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

  assetManagementService = inject(AssetsManagementService);
  userAndAssetStateService = inject(UserAndAssetStateService);

  pathToIcon!: string;
  iconNameToLowerCase!: string;
  altName!: string;

  assetDisplayModeEnum = AssetDisplayMode;
  assetDisplayModeValue = this.assetManagementService.assetDisplayMode;

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

  removeAsset() {
    this.userAndAssetStateService.removeAsset();
  }

  addAsset(assetId: string | undefined) {
    if (!assetId) {
      console.error("There's no assed ID to add");
      return;
    }
    this.userAndAssetStateService.addAsset(assetId);
  }
}
