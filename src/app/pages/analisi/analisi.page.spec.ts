import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalisiPage } from './analisi.page';

describe('AnalisiPage', () => {
  let component: AnalisiPage;
  let fixture: ComponentFixture<AnalisiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalisiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalisiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
