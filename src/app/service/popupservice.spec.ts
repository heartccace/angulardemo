import { TestBed } from '@angular/core/testing';

import { PopupService } from './popupservice';

describe('PopupServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PopupService = TestBed.get(PopupService);
    expect(service).toBeTruthy();
  });
});
