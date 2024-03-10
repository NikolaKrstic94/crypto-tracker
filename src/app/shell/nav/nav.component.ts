import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RatesManagementService } from '../../shared/services/rates-management/rates-management.service';
import { InlineResponse2004, InlineResponse2004DataInner } from '../../shared/open-api-spec';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { Observable, map, tap } from 'rxjs';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatPaginatorModule,
    MatPaginator,
  ],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'], // Corrected styleUrl to styleUrls for array usage
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent implements OnInit {
  ratesManagementService = inject(RatesManagementService);
  cd = inject(ChangeDetectorRef);
  currentCurrency = 'USD';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<InlineResponse2004DataInner>([]);
  searchText: string = '';
  currencies$!: Observable<InlineResponse2004>;
  dataSourceCurrencies$!: Observable<InlineResponse2004DataInner[]>;

  ngOnInit() {
    this.cd.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.dataSourceCurrencies$ = this.dataSource.connect();

    this.currencies$ = this.ratesManagementService.getAllRates().pipe(
      map((response) => {
        if (response.data) {
          response.data.sort((a, b) => {
            if (a.symbol && b.symbol) {
              return a.symbol.localeCompare(b.symbol);
            }
            return 0;
          });
        }
        return response;
      }),
      tap((response) => {
        if (response.data) {
          this.dataSource.data = response.data;
        }
      }),
    );
  }

  applyFilter(event: string) {
    const filterValue = event.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  setCurrency(currency: InlineResponse2004DataInner) {
    if (currency) {
      this.ratesManagementService.setCurrency(currency);
      this.currentCurrency = currency.symbol!;
    }
  }
}
