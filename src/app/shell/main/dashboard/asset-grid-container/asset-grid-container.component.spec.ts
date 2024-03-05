import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetGridContainerComponent } from './asset-grid-container.component';

describe('AssetGridContainerComponent', () => {
  let component: AssetGridContainerComponent;
  let fixture: ComponentFixture<AssetGridContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetGridContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssetGridContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
