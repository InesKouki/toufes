import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePresentationSessionComponent } from './create-presentation-session.component';

describe('CreatePresentationSessionComponent', () => {
  let component: CreatePresentationSessionComponent;
  let fixture: ComponentFixture<CreatePresentationSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePresentationSessionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePresentationSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
