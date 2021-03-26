import { TestBed } from '@angular/core/testing';

import { VocWebClientService } from './voc-web-client.service';

describe('VocWebClientService', () => {
  let service: VocWebClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VocWebClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
