import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-question-bank',
  templateUrl: './question-bank.component.html',
  styleUrls: ['./question-bank.component.css']
})
export class QuestionBankComponent implements OnInit {
  showQuestion:boolean=true;
  manageQuestions:boolean=true;
  showCodingQuestions:boolean=true;
  constructor(private route:Router) { }

  ngOnInit() {


  }
  loadAddQuestionPage(flag:boolean){
    // alert("route ")
    this.showQuestion=flag;
  }
  loadManageQuestionPage(flag:boolean){
    // alert("route ")
    this.manageQuestions=flag;
  }

  loadAddCodingQuestionPage(flag:boolean){
    this.showCodingQuestions=flag;
  }


  handleFileUpload(event: any) {
    const file = event.target.files[0];
    // Perform the necessary file handling logic
    console.log('Uploaded file:', file);
  }


  generateExcelFile() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([
      ['Column 1', 'Column 2', 'Column 3', 'Column 4', 'Column 5', 'Column 6', 'Column 7'],
      ['', '', '', '', '', '', ''], // Add empty row
    ]);

    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };

    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(data, 'excel_file.xlsx');
}

}
