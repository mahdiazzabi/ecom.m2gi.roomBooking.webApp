import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogementsComponent } from './logements.component';

describe('LogementsComponent', () => {
  let component: LogementsComponent;
  let fixture: ComponentFixture<LogementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
