import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatrimonioPage } from './patrimonio.page';

describe('PatrimonioPage', () => {
  let component: PatrimonioPage;
  let fixture: ComponentFixture<PatrimonioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatrimonioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatrimonioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
