import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaBillingComponent } from './sa-billing.component';

describe('SaBillingComponent', () => {
  let component: SaBillingComponent;
  let fixture: ComponentFixture<SaBillingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaBillingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
