import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatastaliPage } from './catastali.page';

describe('CatastaliPage', () => {
  let component: CatastaliPage;
  let fixture: ComponentFixture<CatastaliPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatastaliPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatastaliPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
