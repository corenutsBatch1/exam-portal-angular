import { HttpClient } from '@angular/common/http';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'src/app/model/model/Subject';
import Swal from 'sweetalert2';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-AddSubject',
  templateUrl: './AddSubject.component.html',
  styleUrls: ['./AddSubject.component.css'],
})
export class AddSubjectComponent implements OnInit {
  myForm: any = FormGroup;
  submitted = false;
  objectId!: string;
  objectData: any = {};
  isAddOperation?: boolean;
  isEditOperation?: boolean;
  subject: Subject = new Subject();
  selectedSubject ?: string;
  selectedValue ? : string
  inputvalue?: string;
  @Input() id: any;
  @Output('loadAddSubjectPage') loadAddSubjectPage = new EventEmitter();
  Subjects: Subject = new Subject();
  availableSubjects? : Set<string | undefined> = new Set();
  constructor(
    private http: HttpClient,
    private subService : SubjectService,
    private formbBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  get f() {
    return this.myForm.controls;
  }

  ngOnInit() {
    this.isAddOperation = this.route.snapshot.queryParams['action'] === 'add';
    this.isEditOperation = this.route.snapshot.queryParams['action'] === 'edit';
    this.subject.name = '';
    if (this.isEditOperation && this.id) {
      this.http
        .get<Subject>(`http://54.64.6.102:9033/api/subject/${this.id}`)
        .subscribe((data) => {
          this.subject = data;
          console.log(this.subject);
        });
    }
    this.myForm = this.formbBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.subService.fetchSubjects().subscribe((data : Subject[]) => {
      const newdata = data.map((subject) => subject.name)
      this.availableSubjects = new Set(newdata)
      console.log("available subjects -> " + this.availableSubjects)
    })
    
  }

  convertToUppercase(){
    this.subject.name = this.subject.name?.toUpperCase()
  }

  onSubmit() {
    if (this.id) {
      this.submitted = true;
      if (this.myForm.invalid) {
        return;
      }
      if (this.submitted) {
        this.editSubjectInfo();
      }
    } else {
      this.submitted = true;
      if (this.myForm.invalid) {
        return;
      }
      if (this.submitted) {
        this.myForm.value.name = this.myForm.value.name.replace(/\s+/g, '');
        this.myForm.value.description = this.myForm.value.description.replace(/\s+/g, '');
        this.addSubjectInfo();
      }
    }
  }

  //add Category info
  addSubjectInfo() {
    console.log(this.myForm.value.name)
    console.log(this.myForm.value.description)

    this.http
      .post<any>('http://54.64.6.102:9033/api/subject', this.myForm.value)
      .subscribe(
        (response) => {
          Swal.fire({
            title: 'Subject added successfully',
            text: '',
            icon: 'success',
          });
          this.clearForm();
        },
        (error: any) => {
          Swal.fire('Topic with same name already present', '', 'error');
        }
      );
  }

  //edit Category info
  editSubjectInfo() {
    console.log(this.myForm);
    this.http
      .put<any>(
        `http://54.64.6.102:9033/api/subject/${this.id}`,
        this.myForm.value
      )
      .subscribe((response) => {
        Swal.fire({
          title: 'Subject updated successfully',
          text: '',
          icon: 'success',
          // Additional configuration options...
        });
        this.goBack();
      });
  }

  clearForm() {
    this.myForm.reset();
    this.submitted = false;
  }

  goBack() {
    this.loadAddSubjectPage.emit(true);
  }
}
