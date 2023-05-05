import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualUserExamResultComponent } from './individual-user-exam-result.component';

describe('IndividualUserExamResultComponent', () => {
  let component: IndividualUserExamResultComponent;
  let fixture: ComponentFixture<IndividualUserExamResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualUserExamResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualUserExamResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
