import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddContentService {

  private apiUrl: string = environment.apiBaseURL + "/entry"

  constructor(private httpClient: HttpClient) { }

}
