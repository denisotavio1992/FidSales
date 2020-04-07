import { TestBed } from '@angular/core/testing';

import { RoupaCategoriaService } from './roupa-categoria.service';

describe('RoupaCategoriaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoupaCategoriaService = TestBed.get(RoupaCategoriaService);
    expect(service).toBeTruthy();
  });
});
