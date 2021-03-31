import { TestBed } from '@angular/core/testing';

import { VocCoreService } from './voc-core.service';

describe('VocCoreService', () => {
  let service: VocCoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VocCoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
