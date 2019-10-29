import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientHomePage } from './client-home.page';

describe('ClientHomePage', () => {
  let component: ClientHomePage;
  let fixture: ComponentFixture<ClientHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientHomePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
