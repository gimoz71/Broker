import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedaImmobilePage } from './scheda-immobile.page';

describe('SchedaImmobilePage', () => {
  let component: SchedaImmobilePage;
  let fixture: ComponentFixture<SchedaImmobilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedaImmobilePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedaImmobilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
