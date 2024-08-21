import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-presentation-template-dialog',
  templateUrl: './presentation-template-dialog.component.html',
  styleUrls: ['./presentation-template-dialog.component.css']
})
export class PresentationTemplateDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<PresentationTemplateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
