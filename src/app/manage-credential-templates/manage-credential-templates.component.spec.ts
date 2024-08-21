import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCredentialTemplatesComponent } from './manage-credential-templates.component';

describe('ManageCredentialTemplatesComponent', () => {
  let component: ManageCredentialTemplatesComponent;
  let fixture: ComponentFixture<ManageCredentialTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageCredentialTemplatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageCredentialTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
