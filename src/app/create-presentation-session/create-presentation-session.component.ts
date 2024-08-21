import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VerifierService } from '../services/verifier.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-create-presentation-session',
  templateUrl: './create-presentation-session.component.html',
  styleUrls: ['./create-presentation-session.component.css']
})
export class CreatePresentationSessionComponent implements OnInit {
  presentationSessionForm: FormGroup;
  templates: any[] = [];
  qrCodeDataUrl: any;
  presentationRequestUri: string = '';
  externalUserId: string = '93ced838-9a82-4e59-aed8-e3db65074e97'; // Default external user ID

  constructor(
    private fb: FormBuilder,
    private verifierService: VerifierService,
    private snackBar: MatSnackBar,
    private sanitizer: DomSanitizer
  ) {
    this.presentationSessionForm = this.fb.group({
      templateName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.verifierService.getPresentationTemplates().subscribe({
      next: (data) => this.templates = data.content,
      error: (err) => this.snackBar.open('Failed to fetch presentation templates', 'Close', { duration: 3000, panelClass: 'error-snackbar' })
    });
  }

  onSubmit(): void {
    if (this.presentationSessionForm.valid) {
      const formValue = this.presentationSessionForm.value;
      const template = this.templates.find(t => t.presentationTemplateName === formValue.templateName);

      if (!template) {
        this.snackBar.open('Template not found', 'Close', { duration: 3000, panelClass: 'error-snackbar' });
        return;
      }

      const params = new URLSearchParams({
        presentationTemplateId: template.presentationTemplateId,
        externalUserId: this.externalUserId
      });

      this.verifierService.createPresentationSession(params.toString()).subscribe({
        next: (response) => {
          this.presentationRequestUri = response.presentationRequestUri;
          if (this.presentationRequestUri) {
            this.generateQrCode(this.presentationRequestUri);
          } else {
            this.snackBar.open('Failed to retrieve presentation request URI', 'Close', { duration: 3000, panelClass: 'error-snackbar' });
          }
        },
        error: (err) => this.snackBar.open('Failed to create presentation session', 'Close', { duration: 3000, panelClass: 'error-snackbar' })
      });
    } else {
      this.snackBar.open('Form is invalid', 'Close', { duration: 3000, panelClass: 'error-snackbar' });
    }
  }

  generateQrCode(data: string): void {
    QRCode.toDataURL(data, (err, url) => {
      if (err) {
        console.error(err);
        this.snackBar.open('Failed to generate QR code', 'Close', { duration: 3000, panelClass: 'error-snackbar' });
        return;
      }
      this.qrCodeDataUrl = this.sanitizer.bypassSecurityTrustUrl(url);
    });
  }
}
