import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { McConsentComponent } from './mc-consent.component';

describe('McConsentComponent', () => {
  let component: McConsentComponent;
  let fixture: ComponentFixture<McConsentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ McConsentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(McConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
