import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { saveAs } from 'file-saver';
import { Subject } from 'src/app/model/model/Subject';
import { SubjectService } from 'src/app/services/subject.service';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-question-bank',
  templateUrl: './question-bank.component.html',
  styleUrls: ['./question-bank.component.css']
})
export class QuestionBankComponent implements OnInit {

  showQuestion:boolean=true;
  manageQuestions:boolean=true;
  showCodingQuestions:boolean=true;
  selectedFile: File | null = null;
  currentDateTime?: string;
  subjects?:Subject[];
document: any;
  constructor(private route:Router,private http : HttpClient,private subjectService:SubjectService) {
    this.getCurrentDateTime();
   }
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

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
  getCurrentDateTime(): void {
    const currentDate = new Date();
    this.currentDateTime = currentDate.toISOString();
  }
  uploadFile(): void {
    if (this.selectedFile) {
      if (this.selectedFile.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        Swal.fire('Please upload only Excel files.','','error');
        return;
      }
    const formData: FormData = new FormData();
    formData.append('file', this.selectedFile);

    const uploadHeaders = new HttpHeaders();

    uploadHeaders.append('Content-Type', 'multipart/form-data');
    uploadHeaders.append('Accept', 'application/json');

    this.http.post(`http://54.64.6.102:9033/api/questions/upload`, formData, { headers: uploadHeaders, responseType: 'blob' })
      .subscribe((blob: Blob) => {
        if (blob.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
          const currentDateTime = new Date().toISOString();
        const downloadLink = document.createElement('a');
        const url = window.URL.createObjectURL(blob);


        downloadLink.href = url;

        downloadLink.download = 'errors_'+this.currentDateTime+'.xlsx';
        downloadLink.click();

        window.URL.revokeObjectURL(url);
        downloadLink.remove();
        Swal.fire('File uploaded successfully with some errors','','warning');
      }
        else {
          console.log('No errors found');
          Swal.fire('File uploaded successfully','','success');
        }

      }, error => {
        console.warn(error);
        Swal.fire('File upload failed:','','error');
              });}
  }

  generateExcelFile() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([

      ['subject', 'topic', 'answer', 'content', 'option_a', 'option_b', 'option_c','option_d','q_type'],
      ['', '', '', '', '', '', ''], // Add empty row
    ]);

    const workbook: XLSX.WorkBook = { Sheets: { 'questions': worksheet }, SheetNames: ['questions'] };

    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const questions: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(questions, 'excel_file.xlsx');
}


}
