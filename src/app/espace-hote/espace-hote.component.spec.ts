import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceHoteComponent } from './espace-hote.component';

describe('EspaceHoteComponent', () => {
  let component: EspaceHoteComponent;
  let fixture: ComponentFixture<EspaceHoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspaceHoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspaceHoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
