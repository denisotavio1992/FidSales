import { TestBed } from '@angular/core/testing';

import { MaquiagemCategoriaService } from './maquiagem-categoria.service';

describe('MaquiagemCategoriaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MaquiagemCategoriaService = TestBed.get(MaquiagemCategoriaService);
    expect(service).toBeTruthy();
  });
});
