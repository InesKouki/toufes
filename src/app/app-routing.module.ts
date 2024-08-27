import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IssuerComponent } from './issuer/issuer.component';
import { VerifierComponent } from './verifier/verifier.component';
import { IssuanceComponent } from './issuance/issuance.component';
import { ManageCredentialTemplatesComponent } from './manage-credential-templates/manage-credential-templates.component';
import { CreatePresentationTemplateComponent } from './create-presentation-template/create-presentation-template.component';
import { ManagePresentationTemplatesComponent } from './manage-presentation-templates/manage-presentation-templates.component';
import { CreatePresentationSessionComponent } from './create-presentation-session/create-presentation-session.component';

const routes: Routes = [
  { path: 'issuer', component: IssuerComponent },
  { path: 'issuance', component: IssuanceComponent },
  { path: 'create-presentation-template', component: CreatePresentationTemplateComponent },
  { path: 'manage-presentation-templates', component: ManagePresentationTemplatesComponent },
  { path: 'manage-templates', component: ManageCredentialTemplatesComponent },
  { path: 'create-presentation-session', component: CreatePresentationSessionComponent },
  { path: '', redirectTo: '/issuer', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
