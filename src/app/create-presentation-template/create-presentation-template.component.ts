import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-presentation-template',
  templateUrl: './create-presentation-template.component.html',
  styleUrls: ['./create-presentation-template.component.css']
})
export class CreatePresentationTemplateComponent implements OnInit {
  presentationTemplateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    this.presentationTemplateForm = this.fb.group({
      presentationTemplateName: ['ID-card presentation', Validators.required],
      requiredType: ['ID-Card', Validators.required],
      requiredClaims: this.fb.array([
        this.createClaim('first_name', 'John'),
        this.createClaim('last_name', 'Doe')
      ])
    });
  }

  ngOnInit(): void { }

  createClaim(claimName: string, value: string): FormGroup {
    return this.fb.group({
      claimName: [claimName, Validators.required],
      value: [value, Validators.required]
    });
  }

  get requiredClaims(): FormArray {
    return this.presentationTemplateForm.get('requiredClaims') as FormArray;
  }

  addClaim(): void {
    this.requiredClaims.push(this.createClaim('', ''));
  }

  removeClaim(index: number): void {
    this.requiredClaims.removeAt(index);
  }

  onSubmit(): void {
    if (this.presentationTemplateForm.valid) {
      const formValue = this.presentationTemplateForm.value;
      const payload = {
        presentationTemplateName: formValue.presentationTemplateName,
        callBackUrl: 'https://lissi.id',
        presentationRequirements: {
          credentialCriteria: [
            {
              requiredType: formValue.requiredType,
              allowedIssuers: [],
              requiredClaims: formValue.requiredClaims
            }
          ]
        }
      };

      this.http.post('http://192.168.33.10:8088/api/v1/presentation-templates', payload)
        .subscribe({
          next: (response) => this.snackBar.open('Presentation template created successfully', 'Close', { duration: 3000, panelClass: 'success-snackbar' }),
          error: (error) => this.snackBar.open('Failed to create presentation template', 'Close', { duration: 3000, panelClass: 'error-snackbar' })
        });
    } else {
      this.snackBar.open('Form is invalid', 'Close', { duration: 3000, panelClass: 'error-snackbar' });
    }
  }
}
