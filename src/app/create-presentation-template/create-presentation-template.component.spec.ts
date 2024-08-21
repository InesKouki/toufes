import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePresentationTemplateComponent } from './create-presentation-template.component';

describe('CreatePresentationTemplateComponent', () => {
  let component: CreatePresentationTemplateComponent;
  let fixture: ComponentFixture<CreatePresentationTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePresentationTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePresentationTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
