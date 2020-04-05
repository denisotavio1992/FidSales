import { TestBed } from '@angular/core/testing';

import { CelularCategoriaServiceService } from './celular-categoria-service.service';

describe('CelularCategoriaServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CelularCategoriaServiceService = TestBed.get(CelularCategoriaServiceService);
    expect(service).toBeTruthy();
  });
});
