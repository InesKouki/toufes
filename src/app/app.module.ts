import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IssuerComponent } from './issuer/issuer.component';
import { VerifierComponent } from './verifier/verifier.component';
import { NavigationComponent } from './navigation/navigation.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { IssuanceComponent } from './issuance/issuance.component';
import { ManageCredentialTemplatesComponent } from './manage-credential-templates/manage-credential-templates.component';
import { CredentialTemplateDialogComponent } from './credential-template-dialog/credential-template-dialog.component';
import { CreatePresentationTemplateComponent } from './create-presentation-template/create-presentation-template.component';
import { ManagePresentationTemplatesComponent } from './manage-presentation-templates/manage-presentation-templates.component';
import { PresentationTemplateDialogComponent } from './presentation-template-dialog/presentation-template-dialog.component';
import { CreatePresentationSessionComponent } from './create-presentation-session/create-presentation-session.component';


@NgModule({
  declarations: [
    AppComponent,
    IssuerComponent,
    VerifierComponent,
    NavigationComponent,
    IssuanceComponent,
    ManageCredentialTemplatesComponent,
    CredentialTemplateDialogComponent,
    CreatePresentationTemplateComponent,
    ManagePresentationTemplatesComponent,
    PresentationTemplateDialogComponent,
    CreatePresentationSessionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatListModule,
    MatDialogModule,
    MatGridListModule,
    MatSelectModule,
    MatSnackBarModule,
    MatCheckboxModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
