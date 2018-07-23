import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { McSignupPhoneComponent } from './mc-signup-phone.component';

describe('McSignupPhoneComponent', () => {
  let component: McSignupPhoneComponent;
  let fixture: ComponentFixture<McSignupPhoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ McSignupPhoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(McSignupPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
