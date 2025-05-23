import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGroupListComponent } from './user-group-list.component';

describe('UserGroupListComponent', () => {
  let component: UserGroupListComponent;
  let fixture: ComponentFixture<UserGroupListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserGroupListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
