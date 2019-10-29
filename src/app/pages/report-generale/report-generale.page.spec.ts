import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportGeneralePage } from './report-generale.page';

describe('ReportGeneralePage', () => {
  let component: ReportGeneralePage;
  let fixture: ComponentFixture<ReportGeneralePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportGeneralePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportGeneralePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
