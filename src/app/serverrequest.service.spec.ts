import { TestBed, inject } from '@angular/core/testing';

import { ServerrequestService } from './serverrequest.service';

describe('ServerrequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServerrequestService]
    });
  });

  it('should be created', inject([ServerrequestService], (service: ServerrequestService) => {
    expect(service).toBeTruthy();
  }));
});
