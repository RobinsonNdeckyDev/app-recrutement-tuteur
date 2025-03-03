import { ComponentFixture, TestBed } from '@angular/core/testing';

import { postLoginComponent } from './post-login.component';

describe('postLoginComponent', () => {
  let component: postLoginComponent;
  let fixture: ComponentFixture<postLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [postLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(postLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
