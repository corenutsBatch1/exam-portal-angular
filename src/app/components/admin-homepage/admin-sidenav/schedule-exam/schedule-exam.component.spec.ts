import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleExamComponent } from './schedule-exam.component';

describe('ScheduleExamComponent', () => {
  let component: ScheduleExamComponent;
  let fixture: ComponentFixture<ScheduleExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleExamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
