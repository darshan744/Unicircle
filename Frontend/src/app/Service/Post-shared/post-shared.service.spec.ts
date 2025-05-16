import { TestBed } from '@angular/core/testing';

import { PostSharedService } from './post-shared.service';

describe('PostSharedService', () => {
  let service: PostSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
