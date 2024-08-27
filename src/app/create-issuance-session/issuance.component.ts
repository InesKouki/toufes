import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';  // Import MatDialog
import { IssuerService } from '../services/issuer.service';
import * as QRCode from 'qrcode';
import { ActivatedRoute } from '@angular/router';
import { QrDialogComponent } from '../qr-dialog/qr-dialog.component'; // Import your new dialog component

@Component({
  selector: 'app-issuance',
  templateUrl: './issuance.component.html',
  styleUrls: ['./issuance.component.css']
})
export class IssuanceComponent implements OnInit {
  issuanceForm: FormGroup;
  templates: any[] = [];
  qrCodeDataUrl: string | null = null;
  oneTimePassword: string | null = null;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private issuerService: IssuerService,
    private route: ActivatedRoute,
    private dialog: MatDialog  // Inject MatDialog
  ) {
    this.issuanceForm = this.fb.group({
      templateName: ['', Validators.required],
      externalUserId: ['93ced838-9a82-4e59-aed8-e3db65074e97', Validators.required],
      revocable: [true, Validators.required],
      validFrom: ['', Validators.required],
      validUntil: ['', Validators.required],
      subjectClaims: this.fb.array([this.createClaim()])
    });
  }

  ngOnInit(): void {
    this.fetchCredentialTemplates();
    this.generateRandomValidity();
    this.route.queryParams.subscribe(params => {
      if (params['templateName']) {
        this.issuanceForm.patchValue({ templateName: params['templateName'] });
      }
    });
  }

  fetchCredentialTemplates(): void {
    this.issuerService.getCredentialTemplates().subscribe({
      next: (data) => this.templates = data.content.map((template: any) => template.templateName),
      error: (err) => this.snackBar.open('Failed to fetch templates', 'Close', { duration: 3000, panelClass: 'error-snackbar' })
    });
  }

  generateRandomValidity(): void {
    const validFrom = new Date();
    const validUntil = new Date(validFrom);
    validUntil.setFullYear(validFrom.getFullYear() + 1);

    this.issuanceForm.patchValue({
      validFrom: validFrom.toISOString(),
      validUntil: validUntil.toISOString()
    });
  }

  get subjectClaims(): FormArray {
    return this.issuanceForm.get('subjectClaims') as FormArray;
  }

  createClaim(): FormGroup {
    return this.fb.group({
      key: ['', Validators.required],
      value: ['', Validators.required]
    });
  }

  addClaim(): void {
    this.subjectClaims.push(this.createClaim());
  }

  removeClaim(index: number): void {
    this.subjectClaims.removeAt(index);
  }

  onSubmit(): void {
    if (this.issuanceForm.valid) {
      const formValue = this.issuanceForm.value;
      const subjectClaims = formValue.subjectClaims.reduce((acc: any, claim: any) => {
        acc[claim.key] = claim.value;
        return acc;
      }, {});

      const payload = {
        flow: {
          preAuthorizedCode: {
            oneTimePassword: true
          }
        },
        externalUserId: formValue.externalUserId,
        credentialTemplateName: formValue.templateName,
        revocable: formValue.revocable,
        validFrom: formValue.validFrom,
        validUntil: formValue.validUntil,
        subjectClaims: subjectClaims
      };

      this.issuerService.createIssuanceSession(payload).subscribe({
        next: (response) => {
          const credentialOfferUri = `openid-credential-offer://?credential_offer_uri=${response.credentialOfferDetails.credentialOfferUri}`;
          QRCode.toDataURL(credentialOfferUri, { errorCorrectionLevel: 'M' }, (err, url) => {
            if (err) {
              this.snackBar.open('Error generating QR code', 'Close', { duration: 3000, panelClass: 'error-snackbar' });
              return;
            }
            this.qrCodeDataUrl = url;
            this.oneTimePassword = response.credentialOfferDetails.oneTimePassword;

            // Open the QR code dialog
            this.dialog.open(QrDialogComponent, {
              data: {
                qrCodeDataUrl: this.qrCodeDataUrl,
                oneTimePassword: this.oneTimePassword
              }
            });

            this.snackBar.open('Issuance session created', 'Close', { duration: 3000, panelClass: 'success-snackbar' });
          });
        },
        error: (error) => this.snackBar.open('Error creating issuance session', 'Close', { duration: 3000, panelClass: 'error-snackbar' })
      });
    } else {
      this.snackBar.open('Form is invalid', 'Close', { duration: 3000, panelClass: 'error-snackbar' });
    }
  }
}
