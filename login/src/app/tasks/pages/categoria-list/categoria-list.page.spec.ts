import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaListPage } from './categoria-list.page';

describe('CategoriaListPage', () => {
  let component: CategoriaListPage;
  let fixture: ComponentFixture<CategoriaListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
