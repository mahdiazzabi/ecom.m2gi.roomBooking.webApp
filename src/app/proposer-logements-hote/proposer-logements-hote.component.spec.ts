import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposerLogementsHoteComponent } from './proposer-logements-hote.component';

describe('ProposerLogementsHoteComponent', () => {
  let component: ProposerLogementsHoteComponent;
  let fixture: ComponentFixture<ProposerLogementsHoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposerLogementsHoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposerLogementsHoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
