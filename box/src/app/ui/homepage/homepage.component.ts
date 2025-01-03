import { Component } from '@angular/core';
import { MarkdownService } from 'ngx-markdown';
import { HomepageService } from '../../services/homepage.service';
import { MatCard, MatCardContent } from '@angular/material/card';
import { DatePipe, NgFor } from '@angular/common';
import { RecentSubmission } from 'leetcode-query';
import leetcodeSubmissions from '../../../../../scheduler/leetcode-stat/recentSubmissions.json';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Certificate } from '../../interface/certificate';
import { CertificateService } from '../../services/certificate.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    NgFor,
    DatePipe,
    MatTableModule,
    MatProgressBarModule,
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent {
  homePageContent: string = '...Loading';
  recentSubmissions: RecentSubmission[] = leetcodeSubmissions;
  displayedColumns: string[] = ['title', 'status', 'lang', 'timestamp'];
  certificates: Certificate[] = [];

  constructor(
    private homepageSvc: HomepageService,
    private certificateSvc: CertificateService,
    private markdownSvc: MarkdownService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.homepageSvc.getReadMeContent().subscribe(async (content) => {
      this.homePageContent = await this.markdownSvc.parse(content);
    });
    this.certificateSvc.getCertificates().subscribe((certIssues) => {
      certIssues.map(async (cert) => {
        cert.body = await this.markdownSvc.parse(cert.body);
      });
      this.certificates = certIssues;
      console.log(this.certificates);
    });
    this.formatDates();
  }

  formatDates(): void {
    this.recentSubmissions.forEach((submission) => {
      const epoch = Number(submission.timestamp);
      const date = new Date(epoch * 1000);
      const formattedDate = this.datePipe.transform(date, 'medium');
      submission.timestamp = formattedDate ? formattedDate : 'Unknown Date';
    });
  }
}
