import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllUserExamResultTableComponent } from './all-user-exam-result-table.component';

describe('AllUserExamResultTableComponent', () => {
  let component: AllUserExamResultTableComponent;
  let fixture: ComponentFixture<AllUserExamResultTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllUserExamResultTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllUserExamResultTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
