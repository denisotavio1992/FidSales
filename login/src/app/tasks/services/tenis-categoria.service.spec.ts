import { TestBed } from '@angular/core/testing';

import { TenisCategoriaService } from './tenis-categoria.service';

describe('TenisCategoriaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TenisCategoriaService = TestBed.get(TenisCategoriaService);
    expect(service).toBeTruthy();
  });
});
