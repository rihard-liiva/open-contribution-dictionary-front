import { Component, OnInit } from '@angular/core';
import {DictionaryService} from '../services/dictionary.service';
import {DictionaryEntryI} from '../models/dictionary-entry.model';

@Component({
  selector: 'app-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.scss']
})
export class ResultTableComponent implements OnInit {

  public wordsToDisplay: DictionaryEntryI[];

  constructor(private dictionaryService: DictionaryService) { }

  ngOnInit(): void {
    this.dictionaryService.wordsObservable.subscribe(message => {
      this.wordsToDisplay = message;
    })
  }
}
