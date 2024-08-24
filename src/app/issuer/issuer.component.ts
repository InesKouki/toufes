import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-issuer',
  templateUrl: './issuer.component.html',
  styleUrls: ['./issuer.component.css']
})
export class IssuerComponent {
  issuerForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private snackBar: MatSnackBar) {
    this.issuerForm = this.fb.group({
      templateName: ['ID-Card', Validators.required],
      credentialClaims: this.fb.array([
        this.createClaim('first_name', 'First Name', 'en-us', true, 'text'),
        this.createClaim('last_name', 'Last Name', 'en-us', true, 'text')
      ]),
      visualRepresentation: this.fb.group({
        name: ['card', Validators.required],
        locale: ['en-us', Validators.required],
        logo: this.fb.group({
          uri: ['https://example.io/logo.svg', Validators.required],
          altText: ['some alternative text', Validators.required]
        }),
        backgroundColor: ['#70a6e3', Validators.required],
        textColor: ['#ffffff', Validators.required]
      })
    });
  }

  createClaim(name: string, localizedName: string, locale: string, selectivelyDisclosed: boolean, type: string): FormGroup {
    return this.fb.group({
      name: [name, Validators.required],
      localizedClaimNames: this.fb.array([
        this.fb.group({
          name: [localizedName, Validators.required],
          locale: [locale, Validators.required]
        })
      ]),
      selectivelyDisclosed: [selectivelyDisclosed],
      schema: this.fb.group({
        type: [type, Validators.required]
      })
    });
  }

  get credentialClaims(): FormArray {
    return this.issuerForm.get('credentialClaims') as FormArray;
  }

  get visualRepresentation(): FormGroup {
    return this.issuerForm.get('visualRepresentation') as FormGroup;
  }

  addClaim(): void {
    this.credentialClaims.push(this.createClaim('', '', '', false, ''));
  }

  addLocalizedClaimName(index: number): void {
    const claim = this.credentialClaims.at(index) as FormGroup;
    const localizedClaimNames = claim.get('localizedClaimNames') as FormArray;
    localizedClaimNames.push(this.fb.group({
      name: ['', Validators.required],
      locale: ['', Validators.required]
    }));
  }

  getLocalizedClaimNames(claim: AbstractControl): FormArray {
    return claim.get('localizedClaimNames') as FormArray;
  }

  onSubmit(): void {
    if (this.issuerForm.valid) {
      const formValue = this.issuerForm.value;
      const payload = {
        templateName: formValue.templateName,
        credentialClaims: formValue.credentialClaims,
        visualRepresentations: [formValue.visualRepresentation] // Wrap in an array
      };
      this.http.post(`${environment.baseUrl}/credential-templates`, payload)
        .subscribe({
          next: (response) => this.snackBar.open('Success', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          }),
          error: (error) => this.snackBar.open('Error', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          })
        });
    } else {
      this.snackBar.open('Form is invalid', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }
  }
}
