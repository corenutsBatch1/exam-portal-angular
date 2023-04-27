import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCodingQuestionComponent } from './add-coding-question.component';

describe('AddCodingQuestionComponent', () => {
  let component: AddCodingQuestionComponent;
  let fixture: ComponentFixture<AddCodingQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCodingQuestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCodingQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
