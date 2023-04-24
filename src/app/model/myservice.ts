import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyserviceService {
  uid?:any;
  eid?:any;
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
}
