import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { McRegisterComponent } from './mc-register.component';

describe('McRegisterComponent', () => {
  let component: McRegisterComponent;
  let fixture: ComponentFixture<McRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ McRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(McRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
