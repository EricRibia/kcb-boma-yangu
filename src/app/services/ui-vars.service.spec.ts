import { TestBed } from '@angular/core/testing';

import { UiVarsService } from './ui-vars.service';

describe('UiVarsService', () => {
  let service: UiVarsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiVarsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
