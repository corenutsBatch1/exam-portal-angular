import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CreatePaper } from 'src/app/model/model/CreatePaper';
import swal from 'sweetalert';
@Component({
  selector: 'app-createPaper',
  templateUrl: './createPaper.component.html',
  styleUrls: ['./createPaper.component.css']
})
export class CreatePaperComponent implements OnInit {

  createPaper:CreatePaper=new CreatePaper();
  papers:CreatePaper[]=[];
  addpaper:boolean=true;
  viewpaper:boolean=true;
  paperid?:number;
  constructor(private http:HttpClient) { }

  ngOnInit() {
  this.fetchPaper();
  }
  loadAddPaperpage(flag:boolean){

    this.addpaper=flag;
  }

  fetchPaper(){
    this.http.get<CreatePaper[]>(`http://localhost:8089/api/getpaper`).subscribe(data=>{

    console.log(data)
    this.papers=data;
  });
  }
  viewPaper(flag:boolean,id:any){
  this.viewpaper=flag;
  this.paperid=id;
  console.log(id)
  console.log(this.paperid)
  }
  delete(id:any)
  {
    return this.http.delete(`http://localhost:8089/api/deletePaper/${id}`);
    // .subscribe(data=>{
    //  this.ngOnInit();
    // console.log(data)})

  }

  deletePaper(id:any){
    this.paperid=id;
    console.log(id)
    console.log(this.paperid)
    swal({
      title: "Are you sure you want to Delete? ",
      icon: "warning",
      buttons: ['Cancel', 'Yes, Delete'],
      dangerMode: true,
    })
    .then((deleteConfirmed: any) => {
      if (deleteConfirmed) {
        this.delete(this.paperid).subscribe(
      reponse=>{
        swal("Deleted successfully", '', "success");
        console.log(reponse);
        console.log(id);
        this.ngOnInit();
      }
      );
      } else {
      }
       });

    }

}
