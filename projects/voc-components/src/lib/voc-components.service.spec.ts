import { TestBed } from '@angular/core/testing';

import { VocComponentsService } from './voc-components.service';

describe('VocComponentsService', () => {
  let service: VocComponentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VocComponentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
