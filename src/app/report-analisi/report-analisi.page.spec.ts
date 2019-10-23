import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAnalisiPage } from './report-analisi.page';

describe('ReportAnalisiPage', () => {
  let component: ReportAnalisiPage;
  let fixture: ComponentFixture<ReportAnalisiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportAnalisiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportAnalisiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
