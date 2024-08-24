import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IssuerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getCredentialTemplates(page: number = 0, size: number = 10): Observable<any> {
    return this.http.get(`${this.baseUrl}/credential-templates`, {
      params: {
        page: page.toString(),
        size: size.toString()
      }
    });
  }
  getIssuanceSessions(page: number = 0, size: number = 10): Observable<any> {
    return this.http.get(`${this.baseUrl}/issuance-sessions`, {
      params: {
        page: page.toString(),
        size: size.toString()
      }
    });
  }

  createIssuanceSession(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/issuance-sessions`, payload);
  }

  deleteCredentialTemplateByName(templateName: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/credential-templates/${templateName}`);
  }

  getCredentialTemplateByName(templateName: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/credential-templates/${templateName}`);
  }
}
