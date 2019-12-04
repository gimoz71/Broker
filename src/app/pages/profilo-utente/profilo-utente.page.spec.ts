import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfiloUtentePage } from './profilo-utente.page';

describe('ProfiloUtentePage', () => {
  let component: ProfiloUtentePage;
  let fixture: ComponentFixture<ProfiloUtentePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfiloUtentePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfiloUtentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
