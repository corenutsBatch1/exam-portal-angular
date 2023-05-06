import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyserviceService {
  uid?:any;
  eid?:any;
  codingmark=0;
<<<<<<< Updated upstream

=======
  bool?: boolean;
>>>>>>> Stashed changes
constructor() { }

userid(id:any)
{
   this.uid=id;
   console.log(id+"uid in service")
}
sendid()
{
  return this.uid;
}
examid(eid:any)
{
   this.eid=eid;
   console.log(" eid in service"+eid)
}
sendeid()
{
  return this.eid;
}
codingmarks(marks:any){
  this.codingmark=this.codingmark+marks;
  console.log("in service"+this.codingmark);
  console.log(this.codingmark +"in service")
}
getcodingmarks(){
  return this.codingmark;
}

<<<<<<< Updated upstream
cid?:number;
runCodeClicked=new EventEmitter();

setCId(id: number) {
  this.cid = id;
  this.runCodeClicked.emit(this.cid);
}

getCId() {
  return this.cid;
}

=======
codingBoolean(flag:boolean){
  this.bool=flag;
  }
  sendCodingBoolean(){
    return this.bool;
  }
>>>>>>> Stashed changes
}
