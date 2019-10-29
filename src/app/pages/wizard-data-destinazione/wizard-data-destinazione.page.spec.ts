import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardDataDestinazionePage } from './wizard-data-destinazione.page';

describe('WizardDataDestinazionePage', () => {
  let component: WizardDataDestinazionePage;
  let fixture: ComponentFixture<WizardDataDestinazionePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WizardDataDestinazionePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardDataDestinazionePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
