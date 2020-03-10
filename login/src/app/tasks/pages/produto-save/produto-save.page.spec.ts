import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoSavePage } from './produto-save.page';

describe('ProdutoSavePage', () => {
  let component: ProdutoSavePage;
  let fixture: ComponentFixture<ProdutoSavePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdutoSavePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutoSavePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
