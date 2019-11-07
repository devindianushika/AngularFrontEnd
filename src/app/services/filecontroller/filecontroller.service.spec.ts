import { TestBed } from '@angular/core/testing';

import { FilecontrollerService } from './filecontroller.service';

describe('FilecontrollerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FilecontrollerService = TestBed.get(FilecontrollerService);
    expect(service).toBeTruthy();
  });
});
