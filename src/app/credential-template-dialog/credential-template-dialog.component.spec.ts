import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialTemplateDialogComponent } from './credential-template-dialog.component';

describe('CredentialTemplateDialogComponent', () => {
  let component: CredentialTemplateDialogComponent;
  let fixture: ComponentFixture<CredentialTemplateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CredentialTemplateDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CredentialTemplateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
