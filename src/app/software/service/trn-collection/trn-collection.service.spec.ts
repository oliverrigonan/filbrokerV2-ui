import { TestBed } from '@angular/core/testing';

import { TrnCollectionService } from './trn-collection.service';

describe('TrnCollectionService', () => {
  let service: TrnCollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrnCollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
