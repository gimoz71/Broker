import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardDatiTassazionePage } from './wizard-dati-tassazione.page';

describe('WizardDatiTassazionePage', () => {
  let component: WizardDatiTassazionePage;
  let fixture: ComponentFixture<WizardDatiTassazionePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WizardDatiTassazionePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardDatiTassazionePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
