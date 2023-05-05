import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllUserExamResultComponent } from './all-user-exam-result.component';

describe('AllUserExamResultComponent', () => {
  let component: AllUserExamResultComponent;
  let fixture: ComponentFixture<AllUserExamResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllUserExamResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllUserExamResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
