import {HttpHeaders} from '@angular/common/http';

export const environment = {
  production: true,
  apiBaseURL: "http://13.49.23.138:8000/api",
  httpOptions : {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
};
