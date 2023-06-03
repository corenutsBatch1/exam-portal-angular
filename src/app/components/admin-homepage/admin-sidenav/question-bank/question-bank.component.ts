import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { saveAs } from 'file-saver';
import { Subject } from 'src/app/model/model/Subject';
import { SubjectService } from 'src/app/services/subject.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-question-bank',
  templateUrl: './question-bank.component.html',
  styleUrls: ['./question-bank.component.css']
})
export class QuestionBankComponent implements OnInit {
  showQuestion: boolean = true;
  manageQuestions: boolean = true;
  showCodingQuestions: boolean = true;
  subjects?: Subject[];
  constructor(private route: Router, private http: HttpClient, private subjectService: SubjectService) { }

  ngOnInit() {
    this.subjectService.fetchSubjects().subscribe((data) => {
      this.subjects = data;
    });
  }
  loadAddQuestionPage(flag: boolean) {
    // alert("route ")
    this.showQuestion = flag;
  }
  loadManageQuestionPage(flag: boolean) {
    // alert("route ")
    this.manageQuestions = flag;
  }

  loadAddCodingQuestionPage(flag: boolean) {
    this.showCodingQuestions = flag;
  }


  handleFileUpload(event: any) {
    const file = event.target.files[0];
    // Perform the necessary file handling logic
    console.log('Uploaded file:', file);
    this.sendFileToServer(file)
  }

  sendFileToServer(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    this.http.post('http://54.64.6.102:9033/api/questions/upload', formData).subscribe(response => {
      console.log("File uploaded successfully")
    });
  }


  generateExcelFile() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([
      ['subject', 'topic', 'answer', 'content', 'option_a', 'option_b', 'option_c', 'option_d', 'q_type'],
      ['', '', '', '', '', '', '', '', ''], // Add empty row
    ]);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };

    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(data, 'excel_file.xlsx');
  }

}
