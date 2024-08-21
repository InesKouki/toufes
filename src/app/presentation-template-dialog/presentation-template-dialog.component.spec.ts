import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationTemplateDialogComponent } from './presentation-template-dialog.component';

describe('PresentationTemplateDialogComponent', () => {
  let component: PresentationTemplateDialogComponent;
  let fixture: ComponentFixture<PresentationTemplateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresentationTemplateDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresentationTemplateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
