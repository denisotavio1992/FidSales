import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenderPage } from './vender.page';

describe('VenderPage', () => {
  let component: VenderPage;
  let fixture: ComponentFixture<VenderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
