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
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

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
    MatIconModule
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
  dataSource = new MatTableDataSource<InlineResponse200DataInner>(this.assets);
  dataSourceAssets$!: Observable<InlineResponse200DataInner[]>;
  searchText: string = '';

  ngOnInit() {
    this.cd.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.dataSourceAssets$ = this.dataSource.connect();

    if (this.paginator) {
      this.paginator.pageSize = 16;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['assets']) {
      this.dataSource.data = this.assets as InlineResponse200DataInner[];
    }
    this.applyFilter();
  }

  applyFilter() {
    const filterValue = this.searchText.trim().toLowerCase();
    this.dataSource.filter = filterValue;
    this.dataSource.data = this.dataSource.filteredData;
  }
}
