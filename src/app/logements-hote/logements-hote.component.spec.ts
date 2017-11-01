import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogementsHoteComponent } from './logements-hote.component';

describe('LogementsHoteComponent', () => {
  let component: LogementsHoteComponent;
  let fixture: ComponentFixture<LogementsHoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogementsHoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogementsHoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
