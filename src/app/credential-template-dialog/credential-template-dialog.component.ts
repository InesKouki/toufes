import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-credential-template-dialog',
  templateUrl: './credential-template-dialog.component.html',
  styleUrls: ['./credential-template-dialog.component.css']
})
export class CredentialTemplateDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<CredentialTemplateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
