import { TestBed } from '@angular/core/testing';

import { CelularCategoriaService } from './celular-categoria.service';

describe('CelularCategoriaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CelularCategoriaService = TestBed.get(CelularCategoriaService);
    expect(service).toBeTruthy();
  });
});
