import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoSavePage } from './evento-save.page';

describe('EventoSavePage', () => {
  let component: EventoSavePage;
  let fixture: ComponentFixture<EventoSavePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventoSavePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventoSavePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
