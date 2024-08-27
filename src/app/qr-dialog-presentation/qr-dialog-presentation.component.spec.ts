import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrDialogPresentationComponent } from './qr-dialog-presentation.component';

describe('QrDialogPresentationComponent', () => {
  let component: QrDialogPresentationComponent;
  let fixture: ComponentFixture<QrDialogPresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrDialogPresentationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrDialogPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
