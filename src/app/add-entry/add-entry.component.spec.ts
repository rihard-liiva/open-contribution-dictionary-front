import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEntryComponent } from './add-entry.component';
import {HttpClientModule} from '@angular/common/http';

describe('AddEntryComponent', () => {
  let component: AddEntryComponent;
  let fixture: ComponentFixture<AddEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ AddEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
