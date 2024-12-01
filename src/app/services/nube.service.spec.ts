import { TestBed } from '@angular/core/testing';

import { NubeService } from './nube.service';

describe('NubeService', () => {
  let service: NubeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NubeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
