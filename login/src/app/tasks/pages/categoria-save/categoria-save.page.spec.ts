import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaSavePage } from './categoria-save.page';

describe('CategoriaSavePage', () => {
  let component: CategoriaSavePage;
  let fixture: ComponentFixture<CategoriaSavePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaSavePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaSavePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
