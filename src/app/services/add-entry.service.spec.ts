import { TestBed } from '@angular/core/testing';

import { AddEntryService } from './add-entry.service';
import {HttpClientModule} from '@angular/common/http';

describe('AddContentServiceService', () => {
  let service: AddEntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(AddEntryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
