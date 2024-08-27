import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IssuerComponent } from './create-credential-template/create-credential-template.component';
import { IssuanceComponent } from './create-issuance-session/issuance.component';
import { ManageCredentialTemplatesComponent } from './manage-credential-templates/manage-credential-templates.component';
import { CreatePresentationTemplateComponent } from './create-presentation-template/create-presentation-template.component';
import { ManagePresentationTemplatesComponent } from './manage-presentation-templates/manage-presentation-templates.component';
import { CreatePresentationSessionComponent } from './create-presentation-session/create-presentation-session.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'credential', component: IssuerComponent },
  { path: 'issuance', component: IssuanceComponent },
  { path: 'presentation', component: CreatePresentationTemplateComponent },
  { path: 'presentations', component: ManagePresentationTemplatesComponent },
  { path: 'credentials', component: ManageCredentialTemplatesComponent },
  { path: 'verification', component: CreatePresentationSessionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
