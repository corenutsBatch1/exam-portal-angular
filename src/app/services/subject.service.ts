import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from '../model/model/Subject';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http : HttpClient) { }

  fetchSubjects(){
    return this.http.get<Subject[]>(`http://localhost:8089/api/subjects`)
  }


  deleteSubject(id : number){
    console.log(id);
    return  this.http.delete(`http://localhost:8089/api/subject/${id}`);
  }


}
