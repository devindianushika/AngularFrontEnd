import { TestBed } from '@angular/core/testing';

import { AddnewService } from './addnew.service';

describe('AddnewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddnewService = TestBed.get(AddnewService);
    expect(service).toBeTruthy();
  });
});
