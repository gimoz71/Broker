import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedaClientePage } from './scheda-cliente.page';

describe('SchedaClientePage', () => {
  let component: SchedaClientePage;
  let fixture: ComponentFixture<SchedaClientePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedaClientePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedaClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
