import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuovoClientePage } from './nuovo-cliente.page';

describe('NuovoClientePage', () => {
  let component: NuovoClientePage;
  let fixture: ComponentFixture<NuovoClientePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuovoClientePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuovoClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
