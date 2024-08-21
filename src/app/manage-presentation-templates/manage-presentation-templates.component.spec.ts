import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePresentationTemplatesComponent } from './manage-presentation-templates.component';

describe('ManagePresentationTemplatesComponent', () => {
  let component: ManagePresentationTemplatesComponent;
  let fixture: ComponentFixture<ManagePresentationTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagePresentationTemplatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagePresentationTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
