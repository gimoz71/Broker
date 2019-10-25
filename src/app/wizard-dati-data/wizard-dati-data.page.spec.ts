import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardDatiDataPage } from './wizard-dati-data.page';

describe('WizardDatiDataPage', () => {
  let component: WizardDatiDataPage;
  let fixture: ComponentFixture<WizardDatiDataPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WizardDatiDataPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardDatiDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
