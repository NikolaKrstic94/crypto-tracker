import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  inject,
} from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { AssetCardComponent } from './asset-card/asset-card.component';
import { InlineResponse200DataInner } from '../../../../../shared/open-api-spec/model/inlineResponse200DataInner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { AssetListAndProfilesManagementService } from '../../../../../shared/services/asset-list-and-profiles-management/asset-list-and-profiles-management.service';
import { AssetsPriceUpdateService } from '../../../../../shared/services/assets-price-update/assets-price-update.service';

@Component({
  selector: 'app-asset-grid-representation',
  standalone: true,
  imports: [
    MatGridListModule,
    CommonModule,
    MatCardModule,
    AssetCardComponent,
    MatFormFieldModule,
    MatPaginatorModule,
    MatPaginator,
    FormsModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './asset-grid-representation.component.html',
  styleUrl: './asset-grid-representation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssetGridRepresentationComponent implements OnInit, OnChanges {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() assets!: InlineResponse200DataInner[] | undefined;
  @Input() cols: number | null = 4;

  cd = inject(ChangeDetectorRef);
  assetListAndProfilesManagementService = inject(AssetListAndProfilesManagementService);
  assetsPriceUpdateService = inject(AssetsPriceUpdateService);
  pageSizeAndPageOptions$ = this.assetListAndProfilesManagementService.paginatorOptionsData$;

  dataSource = new MatTableDataSource<InlineResponse200DataInner>(this.assets);
  dataSourceAssets$!: Observable<InlineResponse200DataInner[]>;
  searchText: string = '';

  ngOnInit() {
    this.cd.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.assetListAndProfilesManagementService.assetListPaginatorSubject.next(this.paginator)
    this.dataSourceAssets$ = this.dataSource.connect();

    this.pageSizeAndPageOptions$.pipe(
      tap((value) => {
        this.paginator.pageSize = value.pageSize;
        this.paginator.pageSizeOptions = value.pageOptions;
      }),
    );

    this.emitCurrentPageAssetsIds();
    this.paginator.page.subscribe(() => this.emitCurrentPageAssetsIds());
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['assets']) {
      if (this.assets) {
        this.dataSource.data = this.assets;
      }
    }
  }

  emitCurrentPageAssetsIds() {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;
    const currentPageAssetsIds = this.dataSource.data.slice(startIndex, endIndex).map((asset) => asset.id || '');

    this.assetsPriceUpdateService.emitCurrentPageAssetsIds(currentPageAssetsIds);
  }

  applyFilter() {
    if (this.assets) {
      this.dataSource.data = this.assets;
    }
    const filterValue = this.searchText.trim().toLowerCase();
    this.dataSource.filter = filterValue;
    this.dataSource.data = this.dataSource.filteredData;
  }
}
