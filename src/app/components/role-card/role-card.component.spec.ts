import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RoleCardComponent} from './role-card.component';

describe('RoleCardComponent', () => {
  let component: RoleCardComponent;
  let fixture: ComponentFixture<RoleCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoleCardComponent]
    });
    fixture = TestBed.createComponent(RoleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
