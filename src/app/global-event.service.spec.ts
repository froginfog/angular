import { TestBed, inject } from '@angular/core/testing';

import { GlobalEventService } from './global-event.service';

describe('GlobalEventService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalEventService]
    });
  });

  it('should be created', inject([GlobalEventService], (service: GlobalEventService) => {
    expect(service).toBeTruthy();
  }));
});
