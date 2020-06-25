import { TestBed } from '@angular/core/testing';

import { DictionaryService } from './dictionary.service';
import {HttpClientModule} from '@angular/common/http';

describe('DictionaryServiceService', () => {
  let service: DictionaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(DictionaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
