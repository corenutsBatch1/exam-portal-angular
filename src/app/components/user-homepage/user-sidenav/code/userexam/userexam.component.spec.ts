import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserexamComponent } from './userexam.component';

describe('UserexamComponent', () => {
  let component: UserexamComponent;
  let fixture: ComponentFixture<UserexamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserexamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserexamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
