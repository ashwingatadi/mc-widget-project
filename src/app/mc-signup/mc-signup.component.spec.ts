import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { McSignupComponent } from './mc-signup.component';

describe('McSignupComponent', () => {
  let component: McSignupComponent;
  let fixture: ComponentFixture<McSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ McSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(McSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
