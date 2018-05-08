import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BdGridComponent } from './bd-grid.component';

describe('BdGridComponent', () => {
  let component: BdGridComponent;
  let fixture: ComponentFixture<BdGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BdGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BdGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
