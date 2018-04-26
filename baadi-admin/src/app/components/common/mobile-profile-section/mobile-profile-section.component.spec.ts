import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileProfileSectionComponent } from './mobile-profile-section.component';

describe('MobileProfileSectionComponent', () => {
  let component: MobileProfileSectionComponent;
  let fixture: ComponentFixture<MobileProfileSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileProfileSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileProfileSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
