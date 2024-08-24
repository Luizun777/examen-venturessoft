import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnTextIconComponent } from './btn-text-icon.component';

describe('BtnTextIconComponent', () => {
  let component: BtnTextIconComponent;
  let fixture: ComponentFixture<BtnTextIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnTextIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BtnTextIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
