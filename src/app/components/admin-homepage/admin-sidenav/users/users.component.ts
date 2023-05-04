import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/model/User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  nameFilterValue = '';
  codeFilterValue = '';
  users: User[] = [];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getUsers().subscribe((data) => {
      this.users = data
      this.dataSource.data = this.users
    })

  }

  displayedColumns: string[] = ['serialNumber', 'name', 'email', 'phoneNumber'];
  dataSource = new MatTableDataSource<User>([]);


  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`http://localhost:8088/api/getallusers`)
  }

  applyFilter(): void {
    const nameFilterValue = this.nameFilterValue.trim().toLowerCase();
    console.log(this.nameFilterValue)

    this.dataSource.filterPredicate = (data: User, filter: string) => {
      const nameMatch = data.name?.trim().toLowerCase().includes(nameFilterValue);
      const emailMatch = data.email?.trim().toLowerCase().includes(nameFilterValue );
      const phoneNumberMatch = data.phoneNumber?.trim().toLowerCase().includes(nameFilterValue);
      const idMatch = data.id === parseInt(nameFilterValue);
      return !!(nameMatch || emailMatch ||  phoneNumberMatch || idMatch);
    };

    const filterValue = `${nameFilterValue}`;
    this.dataSource.filter = filterValue;
    console.log(this.dataSource.filter)
  }
}
