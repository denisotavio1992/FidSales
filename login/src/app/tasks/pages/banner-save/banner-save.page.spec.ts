import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerSavePage } from './banner-save.page';

describe('BannerSavePage', () => {
  let component: BannerSavePage;
  let fixture: ComponentFixture<BannerSavePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerSavePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerSavePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
