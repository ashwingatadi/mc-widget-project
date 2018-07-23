import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { McSignupDefaultComponent } from './mc-signup-default.component';

describe('McSignupDefaultComponent', () => {
  let component: McSignupDefaultComponent;
  let fixture: ComponentFixture<McSignupDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ McSignupDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(McSignupDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
