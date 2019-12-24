import { TestBed } from '@angular/core/testing';

import { MissionServiceService } from './mission-service.service';

describe('MissionServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MissionServiceService = TestBed.get(MissionServiceService);
    expect(service).toBeTruthy();
  });
});
