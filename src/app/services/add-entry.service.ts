import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {DictionaryEntryI} from '../models/dictionary-entry.model';

@Injectable({
  providedIn: 'root'
})
export class AddEntryService {

  private apiUrl: string = environment.apiBaseURL + "/entry"

  constructor(private httpClient: HttpClient) { }

  public async makePostRequestNewDictionaryEntry(dictionaryEntry: DictionaryEntryI) {
    return await this.httpClient.post(this.apiUrl, dictionaryEntry, environment.httpOptions).toPromise();
  }

}
