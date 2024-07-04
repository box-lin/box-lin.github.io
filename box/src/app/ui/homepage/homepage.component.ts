import { Component } from '@angular/core';
import { MarkdownService } from 'ngx-markdown';
import { HomepageService } from '../../services/homepage.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

    homePageContent: string = "...Loading";
    constructor(
      private svc: HomepageService,
      private markdownSvc: MarkdownService
    ) {}

    ngOnInit(): void {
      this.svc.getReadMeContent().subscribe(async content => {
        this.homePageContent = await this.markdownSvc.parse(content);
      })
    }
}
