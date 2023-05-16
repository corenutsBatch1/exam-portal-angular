import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualUserResultComponent } from './individual-user-result.component';

describe('IndividualUserResultComponent', () => {
  let component: IndividualUserResultComponent;
  let fixture: ComponentFixture<IndividualUserResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualUserResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualUserResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
