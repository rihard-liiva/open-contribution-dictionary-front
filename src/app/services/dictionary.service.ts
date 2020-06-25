import { Injectable } from '@angular/core';
import {LanguageI} from '../models/language.model';
import {HttpClient} from '@angular/common/http';
import {LanguageService} from './language.service';
import {DictionaryEntryI} from '../models/dictionary-entry.model';
import {environment} from '../../environments/environment';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  private apiUrl: string = environment.apiBaseURL + "/entry"

  private wordsToDisplay: DictionaryEntryI[] = null;
  private wordsSource = new BehaviorSubject(this.wordsToDisplay);
  public wordsObservable = this.wordsSource.asObservable();

  constructor(private httpClient: HttpClient) { }

  private async getEquivalentsByLanguage(searchedWord: string, language: LanguageI): Promise<DictionaryEntryI[]> {
    return await this.httpClient.get<DictionaryEntryI[]>(`${this.apiUrl}/search/${searchedWord}/${language.id}`, environment.httpOptions).toPromise();
  }

  private async getEquivalentsByBothLanguages(searchedWord: string, languageFrom: LanguageI, languageTo: LanguageI): Promise<DictionaryEntryI[]> {
    return await this.httpClient.get<DictionaryEntryI[]>(`${this.apiUrl}/search/${searchedWord}/${languageFrom.id}/${languageTo.id}`, environment.httpOptions).toPromise();
  }

  public displayWordsForUser(word: string, languageFrom: LanguageI, languageTo: LanguageI) {
    if (languageTo == null) {
      this.getEquivalentsByLanguage(word, languageFrom).then(data => {
        this.wordsSource.next(data);
      });
    } else {
      this.getEquivalentsByBothLanguages(word, languageFrom, languageTo).then(data => {
        this.wordsSource.next(data);
      })
    }
  }
}
