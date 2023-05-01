import { UserCode } from './../../../../../model/model/UserCode';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as qs from 'qs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CodingApiService {

  userCode?:UserCode

  constructor(private http : HttpClient) { }

  runCode(code: string, language: string,input: string): Observable<any> {
    const url = 'https://api.codex.jaagrav.in';

    const javaUrl='http://localhost:8089/api/savecode'
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const data = {
      'code': code,
      'language': language,
       'input': input
    };
    const headersInJava = new HttpHeaders({
      'Content-Type': 'application/octet-stream'
    });
   // const headersInJava = { 'Content-Type': 'application/octet-stream' };


// //     const text = "Hello, world!";
// const  encoder = new TextEncoder();
//  const bytes = encoder.encode(code);
// const userCode: { code?: Uint8Array } = { code: bytes };


    this.userCode={
      language:'java',
      userInputCode:code,
      exam:{
        id:1
      },
      user:{
        id:2
      },
      codingQuestion:{
        id:1
      }

    }
      this.http.post(javaUrl,this.userCode).subscribe(response => {
        console.log('Upload successful!');
      }, error => {
        console.error('Upload failed:', error);
      });


    return this.http.post(url, qs.stringify(data), { headers: headers });
  }

}
