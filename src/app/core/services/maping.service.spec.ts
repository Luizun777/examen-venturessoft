import { TestBed } from '@angular/core/testing';

import { MapingService } from './maping.service';

describe('MapingService', () => {
  let service: MapingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
