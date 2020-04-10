import { TestBed } from '@angular/core/testing';

import { SiteNavService } from './site-nav.service';

describe('SiteNavService', () => {
  let service: SiteNavService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SiteNavService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
