import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardDestinazionePage } from './wizard-destinazione.page';

describe('WizardDestinazionePage', () => {
  let component: WizardDestinazionePage;
  let fixture: ComponentFixture<WizardDestinazionePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WizardDestinazionePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardDestinazionePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
