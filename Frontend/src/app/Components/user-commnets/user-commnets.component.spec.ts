import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCommnetsComponent } from './user-commnets.component';

describe('UserCommnetsComponent', () => {
  let component: UserCommnetsComponent;
  let fixture: ComponentFixture<UserCommnetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCommnetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCommnetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
