import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerifierService {
  private baseUrl = 'http://192.168.33.10:8088/api/v1';

  constructor(private http: HttpClient) { }

  getPresentationTemplates(page: number = 0, size: number = 10): Observable<any> {
    return this.http.get(`${this.baseUrl}/presentation-templates`, {
      params: {
        page: page.toString(),
        size: size.toString()
      }
    });
  }

  createPresentationTemplate(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/presentation-templates`, payload);
  }

  getPresentationSessions(page: number = 0, size: number = 10): Observable<any> {
    return this.http.get(`${this.baseUrl}/presentation-sessions`, {
      params: {
        page: page.toString(),
        size: size.toString()
      }
    });
  }

  createPresentationSession(queryParams: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/presentation-sessions?${queryParams}`, {});
  }

  deletePresentationTemplateByName(templateName: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/presentation-templates/${templateName}`);
  }

  getPresentationTemplateByName(templateName: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/presentation-templates/${templateName}`);
  }
}
