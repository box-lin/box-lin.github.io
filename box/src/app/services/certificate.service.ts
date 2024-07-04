import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { rootUrl, certificateLabel } from '../constants/service';
import { map, Observable } from 'rxjs';
import { Certificate } from '../interface/certificate';


@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  constructor(private http: HttpClient) { }

  getCertificates(): Observable<Certificate[]> {
    return this.http.get<Certificate[]>(rootUrl).pipe(
      map((issues) =>
        issues
          .filter((issue) => issue.labels.some((label) => label.name === certificateLabel))
          .map((issue) => ({
            title: issue.title,
            labels: issue.labels,
            body: issue.body
          } as Certificate))
      )
    );
  }
}
