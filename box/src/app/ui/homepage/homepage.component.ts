import { Component } from '@angular/core';
import { MarkdownService } from 'ngx-markdown';
import { HomepageService } from '../../services/homepage.service';
import { MatCard, MatCardContent } from '@angular/material/card';
import { DatePipe, NgFor } from '@angular/common';
import { RecentSubmission } from "leetcode-query"
import leetcodeSubmissions from "../../../../../scheduler/leetcode-stat/recentSubmissions.json" 
import { MatTableModule } from '@angular/material/table';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [MatCard, MatCardContent, NgFor, DatePipe, MatTableModule, MatProgressBarModule ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

    homePageContent: string = "...Loading";
    recentSubmissions: RecentSubmission[] = leetcodeSubmissions;
    displayedColumns: string[] = ['title', 'status', 'lang', 'timestamp'];

    constructor(
      private svc: HomepageService,
      private markdownSvc: MarkdownService,
      private datePipe: DatePipe
    ) {}

    ngOnInit(): void {
      this.svc.getReadMeContent().subscribe(async content => {
        this.homePageContent = await this.markdownSvc.parse(content);
      })

      this.formatDates();
    }

    formatDates(): void {
      this.recentSubmissions.forEach(submission => {
        const epoch = Number(submission.timestamp);
        const date = new Date(epoch * 1000);  
        const formattedDate = this.datePipe.transform(date, 'medium');
        submission.timestamp = formattedDate ? formattedDate : 'Unknown Date';
      });
    }
    

}
