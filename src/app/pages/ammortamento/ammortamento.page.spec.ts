import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmmortamentoPage } from './ammortamento.page';

describe('AmmortamentoPage', () => {
  let component: AmmortamentoPage;
  let fixture: ComponentFixture<AmmortamentoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmmortamentoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmmortamentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
