import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosListPage } from './eventos-list.page';

describe('EventosListPage', () => {
  let component: EventosListPage;
  let fixture: ComponentFixture<EventosListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventosListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
