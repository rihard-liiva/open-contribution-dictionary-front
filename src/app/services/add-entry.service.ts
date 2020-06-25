import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {DictionaryEntryI} from '../models/dictionary-entry.model';
import {LanguageI} from '../models/language.model';

@Injectable({
  providedIn: 'root'
})
export class AddEntryService {

  private apiUrl: string = environment.apiBaseURL;

  constructor(private httpClient: HttpClient) { }

  public async makePostRequestNewDictionaryEntry(dictionaryEntry: DictionaryEntryI) {
    return await this.httpClient.post(`${this.apiUrl}/entry`, dictionaryEntry, environment.httpOptions).toPromise();
  }

  public async makePostRequestNewLanguage(languageObjectByLanguageName: LanguageI) {
    return await this.httpClient.post(`${this.apiUrl}/language`, languageObjectByLanguageName, environment.httpOptions).toPromise();
  }
}
