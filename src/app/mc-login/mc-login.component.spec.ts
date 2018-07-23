import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { McLoginComponent } from './mc-login.component';

describe('McLoginComponent', () => {
  let component: McLoginComponent;
  let fixture: ComponentFixture<McLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ McLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(McLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
