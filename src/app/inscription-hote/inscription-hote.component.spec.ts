import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionHoteComponent } from './inscription-hote.component';

describe('InscriptionHoteComponent', () => {
  let component: InscriptionHoteComponent;
  let fixture: ComponentFixture<InscriptionHoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InscriptionHoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InscriptionHoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
