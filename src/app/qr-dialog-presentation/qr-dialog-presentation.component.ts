import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-qr-dialog-presentation',
  template: `
    <h1 mat-dialog-title>Scan QR Code</h1>
    <div mat-dialog-content>
      <img [src]="data.qrCodeDataUrl" alt="QR Code" class="qr-code-img">
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onClose()">Close</button>
    </div>
  `,
  styles: [`
    h1[mat-dialog-title] {
      font-size: 22px;
      font-weight: bold;
      color: #2c3e50; /* Dark grey for a modern look */
      text-align: center;
      margin-bottom: 20px;
    }
    div[mat-dialog-content] {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
      width: 350px;
      height: 350px; /* Ensure the dialog is square-shaped */
    }
    .qr-code-img {
      max-width: 250px;
      max-height: 250px;
      border-radius: 8px;
      border: 1px solid #bdc3c7; /* Subtle border for the QR code image */
    }
    div[mat-dialog-actions] {
      display: flex;
      justify-content: center;
      padding-top: 10px;
    }
    button[mat-button] {
      font-weight: bold;
      color: #ffffff;
      background-color: #007bff; /* Blue color for the button */
      border-radius: 4px;
      padding: 8px 16px;
      text-transform: uppercase;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    button[mat-button]:hover {
      background-color: #0056b3; /* Darker blue on hover */
    }
  `]
})
export class QrDialogPresentationComponent {
  constructor(
    public dialogRef: MatDialogRef<QrDialogPresentationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { qrCodeDataUrl: string }
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
