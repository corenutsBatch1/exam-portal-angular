import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as qs from 'qs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CodingApiService {

  constructor(private http : HttpClient) { }

  runCode(code: string, language: string): Observable<any> {
    const url = 'https://api.codex.jaagrav.in';
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const data = {
      'code': code,
      'language': language
      // 'input': input
    };

    return this.http.post(url, qs.stringify(data), { headers: headers });
  }

}
