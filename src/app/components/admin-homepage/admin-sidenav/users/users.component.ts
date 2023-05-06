import { HttpClient } from '@angular/common/http';
import { Component,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/model/User';
import { MatPaginator } from '@angular/material/paginator';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
import { TDocumentDefinitions } from 'pdfmake/interfaces';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  nameFilterValue = '';
  codeFilterValue = '';
  users: User[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getUsers().subscribe((data) => {
      this.users = data
      this.dataSource.data = this.users
      this.dataSource.paginator = this.paginator;
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

  generatePDF(): void {
    const documentDefinition: TDocumentDefinitions = {
      content: [
        {
          text: 'List of Users',
          style: 'header'
        },
        {
          table: {
            headerRows: 1,
            widths: ['auto', '*', '*', '*'],
            body: [
              ['S.No.','Name', 'Email', 'Phone Number'],
              ...this.dataSource.filteredData.map((user, index) => {
                return [
                  index+1,
                  user.name  || '',
                  user.email || '',
                  user.phoneNumber || ''
                ];
              })
            ]
          }
        }
      ],
      styles: {
        header: {
          fontSize: 22,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 10]
        }
      }
    };

    pdfMake.createPdf(documentDefinition).open();
  }

}
