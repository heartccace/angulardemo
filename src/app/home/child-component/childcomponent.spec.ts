import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildComponentComponent } from './childcomponent';

describe('ChildComponentComponent', () => {
  let component: ChildComponentComponent;
  let fixture: ComponentFixture<ChildComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
