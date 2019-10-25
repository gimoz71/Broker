import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardDatiCatastaliPage } from './wizard-dati-catastali.page';

describe('WizardDatiCatastaliPage', () => {
  let component: WizardDatiCatastaliPage;
  let fixture: ComponentFixture<WizardDatiCatastaliPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WizardDatiCatastaliPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardDatiCatastaliPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
