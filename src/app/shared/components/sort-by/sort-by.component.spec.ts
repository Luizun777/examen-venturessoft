import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SORTBYComponent } from './sort-by.component';

describe('SORTBYComponent', () => {
  let component: SORTBYComponent;
  let fixture: ComponentFixture<SORTBYComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SORTBYComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SORTBYComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
