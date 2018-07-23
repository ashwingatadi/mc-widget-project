import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { McSignupDonateComponent } from './mc-signup-donate.component';

describe('McSignupDonateComponent', () => {
  let component: McSignupDonateComponent;
  let fixture: ComponentFixture<McSignupDonateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ McSignupDonateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(McSignupDonateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
