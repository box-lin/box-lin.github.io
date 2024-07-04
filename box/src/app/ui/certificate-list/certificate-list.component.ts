import { Component } from '@angular/core';
import { Certificate } from '../../interface/certificate';
import { CertificateService  } from '../../services/certificate.service';
import { NgFor } from '@angular/common';
import { MarkdownService } from 'ngx-markdown';


@Component({
  selector: 'app-certificate-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './certificate-list.component.html',
  styleUrl: './certificate-list.component.css',
})
export class CertificateListComponent {
  certificates: Certificate[] = [];
  constructor(
    private svc: CertificateService,
    private markdownSvc: MarkdownService) {}

  ngOnInit(): void {
    this.svc.getCertificates().subscribe(certIssues => {
      certIssues.map(async cert => {
        cert.body = await this.markdownSvc.parse(cert.body)
      })
      this.certificates = certIssues;
      console.log(this.certificates);
      
    })
  }
}
