import { Component, OnInit } from '@angular/core';
import {LanguageService} from '../services/language.service';
import {LanguageI} from '../models/language.model';
import {filter} from 'rxjs/operators';
import {AddEntryService} from '../services/add-entry.service';
import {DictionaryService} from '../services/dictionary.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public languages: LanguageI[];
  public equivalentLanguages: LanguageI[];
  public dataLoaded: boolean = false;

  public wordToSearch: string;
  public selectedOriginatingLanguage: string;
  public selectedEquivalentLanguage: string;

  constructor(private languageService:LanguageService, private dictionaryService: DictionaryService) { }

  ngOnInit(): void {
    this.languageService.getAllLanguages().then(data => {
      this.languages = data;
      // removes the active originating language from equivalent languages
      this.equivalentLanguages = this.languages.filter(function(filteredLanguage) {
        // @ts-ignore
        return filteredLanguage.languageName != data[0].languageName;
      })
      this.selectedOriginatingLanguage = this.languages[0].languageName;
      this.selectedEquivalentLanguage = "Any";
      this.dataLoaded = true;
    });
  }

  searchWord(wordToSearch: string) {
    if (wordToSearch != "") {
      this.dictionaryService.displayWordsForUser(wordToSearch.toLowerCase(),
        this.languageService.getLanguageObjectByLanguageName(this.selectedOriginatingLanguage),
        this.languageService.getLanguageObjectByLanguageName(this.selectedEquivalentLanguage))
    }
  }

  setSelectedOriginatingLanguage(language: string) {
    this.selectedOriginatingLanguage = language;
    // removes the active originating language from equivalent languages
    let filteredLanguages: LanguageI[] = this.languages.filter(function(filteredLanguage) {
      // @ts-ignore
      return filteredLanguage.languageName != language;
    })
    this.equivalentLanguages = filteredLanguages;
  }

  setSelectedEquivalentLanguage(language: string) {
    this.selectedEquivalentLanguage = language;
  }
}
