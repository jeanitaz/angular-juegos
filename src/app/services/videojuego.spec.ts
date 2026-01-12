import { TestBed } from '@angular/core/testing';

import { VideojuegoService } from './videojuego';

describe('Videojuego', () => {
  let service: VideojuegoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideojuegoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
