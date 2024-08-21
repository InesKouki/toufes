import { Component, OnInit } from '@angular/core';
import { IssuerService } from '../services/issuer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CredentialTemplateDialogComponent } from '../credential-template-dialog/credential-template-dialog.component';

@Component({
  selector: 'app-manage-credential-templates',
  templateUrl: './manage-credential-templates.component.html',
  styleUrls: ['./manage-credential-templates.component.css']
})
export class ManageCredentialTemplatesComponent implements OnInit {
  templates: any[] = [];
  issuanceSessions: any[] = [];

  constructor(
    private issuerService: IssuerService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.fetchCredentialTemplates();
    this.fetchIssuanceSessions();
  }

  fetchCredentialTemplates(): void {
    this.issuerService.getCredentialTemplates().subscribe({
      next: (data) => this.templates = data.content,
      error: (err) => this.snackBar.open('Failed to fetch templates', 'Close', { duration: 3000, panelClass: 'error-snackbar' })
    });
  }

  fetchIssuanceSessions(): void {
    this.issuerService.getIssuanceSessions().subscribe({
      next: (data) => this.issuanceSessions = data.content,
      error: (err) => this.snackBar.open('Failed to fetch issuance sessions', 'Close', { duration: 3000, panelClass: 'error-snackbar' })
    });
  }

  deleteCredentialTemplate(templateName: string): void {
    this.issuerService.deleteCredentialTemplateByName(templateName).subscribe({
      next: () => {
        this.snackBar.open('Template deleted', 'Close', { duration: 3000, panelClass: 'success-snackbar' });
        this.fetchCredentialTemplates();
      },
      error: (err) => this.snackBar.open('Failed to delete template', 'Close', { duration: 3000, panelClass: 'error-snackbar' })
    });
  }

  fetchCredentialTemplate(templateName: string): void {
    this.issuerService.getCredentialTemplateByName(templateName).subscribe({
      next: (data) => {
        this.dialog.open(CredentialTemplateDialogComponent, {
          width: '600px',
          data: data
        });
      },
      error: (err) => this.snackBar.open('Failed to fetch template', 'Close', { duration: 3000, panelClass: 'error-snackbar' })
    });
  }
}
