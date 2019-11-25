import { TestBed } from '@angular/core/testing';

import { ToodiesService } from './toodies.service';

describe('ToodiesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToodiesService = TestBed.get(ToodiesService);
    expect(service).toBeTruthy();
  });
});
