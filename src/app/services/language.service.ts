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

  constructor(private httpClient: HttpClient) {

  }

  public async getAllLanguages(): Promise<LanguageI[]> {
    return await this.httpClient.get<LanguageI[]>(this.apiUrl, this.httpOptions).toPromise();
  }

}
