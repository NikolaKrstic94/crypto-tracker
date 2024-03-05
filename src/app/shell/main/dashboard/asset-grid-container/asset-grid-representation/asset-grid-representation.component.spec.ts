import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetGridRepresentationComponent } from './asset-grid-representation.component';

describe('AssetGridRepresentationComponent', () => {
  let component: AssetGridRepresentationComponent;
  let fixture: ComponentFixture<AssetGridRepresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetGridRepresentationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssetGridRepresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
