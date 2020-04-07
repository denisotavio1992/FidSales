import { TestBed } from '@angular/core/testing';

import { PerfumeCategoriaService } from './perfume-categoria.service';

describe('PerfumeCategoriaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PerfumeCategoriaService = TestBed.get(PerfumeCategoriaService);
    expect(service).toBeTruthy();
  });
});
