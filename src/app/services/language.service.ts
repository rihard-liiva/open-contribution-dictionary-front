import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {LanguageI} from '../models/language.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  private apiUrl: string = environment.apiBaseURL + "/language";
  private languages: LanguageI[];

  constructor(private httpClient: HttpClient) {
    this.getAllLanguages().then(data => {
      this.languages = data;
    })
  }

  public async getAllLanguages(): Promise<LanguageI[]> {
    return await this.httpClient.get<LanguageI[]>(this.apiUrl, this.httpOptions).toPromise();
  }

  public getLanguageObjectByLanguageName(languageToFind: string): LanguageI {
    if (languageToFind == "Any") {
      return null;
    }
    for(let language of this.languages) {
      if (language.languageName == languageToFind) {
        return language;
      }
    }
  }

  public languageAlreadyExists(language: string): boolean {
    for (let loopedLanguage of this.languages) {
      if (loopedLanguage.languageName.toLowerCase() == language.toLowerCase()) {
        return true;
      }
    }
    return false;
  }

  public capitalizeLanguage(languageName: string): string {
    return languageName.charAt(0).toUpperCase() + languageName.slice(1);
  }

}
