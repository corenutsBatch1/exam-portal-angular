import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginmodalComponent } from './loginmodal.component';

describe('LoginmodalComponent', () => {
  let component: LoginmodalComponent;
  let fixture: ComponentFixture<LoginmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginmodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
