import { Component, OnInit } from '@angular/core';
import { VerifierService } from '../services/verifier.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PresentationTemplateDialogComponent } from '../presentation-template-dialog/presentation-template-dialog.component';

@Component({
  selector: 'app-manage-presentation-templates',
  templateUrl: './manage-presentation-templates.component.html',
  styleUrls: ['./manage-presentation-templates.component.css']
})
export class ManagePresentationTemplatesComponent implements OnInit {
  presentationTemplates: any[] = [];
  presentationSessions: any[] = [];

  constructor(
    private verifierService: VerifierService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.fetchPresentationTemplates();
    this.fetchPresentationSessions();
  }

  fetchPresentationTemplates(): void {
    this.verifierService.getPresentationTemplates().subscribe({
      next: (data) => this.presentationTemplates = data.content,
      error: (err) => this.snackBar.open('Failed to fetch presentation templates', 'Close', { duration: 3000, panelClass: 'error-snackbar' })
    });
  }

  fetchPresentationSessions(): void {
    this.verifierService.getPresentationSessions().subscribe({
      next: (data) => this.presentationSessions = data.content,
      error: (err) => this.snackBar.open('Failed to fetch presentation sessions', 'Close', { duration: 3000, panelClass: 'error-snackbar' })
    });
  }

  deletePresentationTemplate(templateName: string): void {
    this.verifierService.deletePresentationTemplateByName(templateName).subscribe({
      next: () => {
        this.snackBar.open('Presentation template deleted', 'Close', { duration: 3000, panelClass: 'success-snackbar' });
        this.fetchPresentationTemplates();
      },
      error: (err) => this.snackBar.open('Failed to delete presentation template', 'Close', { duration: 3000, panelClass: 'error-snackbar' })
    });
  }

  fetchPresentationTemplate(templateName: string): void {
    this.verifierService.getPresentationTemplateByName(templateName).subscribe({
      next: (data) => {
        this.dialog.open(PresentationTemplateDialogComponent, {
          width: '600px',
          data: data
        });
      },
      error: (err) => this.snackBar.open('Failed to fetch presentation template', 'Close', { duration: 3000, panelClass: 'error-snackbar' })
    });
  }
}
