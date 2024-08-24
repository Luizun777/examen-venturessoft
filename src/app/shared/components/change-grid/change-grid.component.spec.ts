import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeGridComponent } from './change-grid.component';

describe('ChangeGridComponent', () => {
  let component: ChangeGridComponent;
  let fixture: ComponentFixture<ChangeGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeGridComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChangeGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
