import { Component } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { Project } from '../../interface/project';
import { ProjectService } from '../../services/project.service';
import { MarkdownService } from 'ngx-markdown';
import { NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import {MatDividerModule} from '@angular/material/divider';


@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [MatTab, MatTabGroup, NgFor, MatCardModule, MatButton, MatChipsModule, MatDividerModule],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent {
  projects: Project[] = [];
  constructor(
    private svc: ProjectService,
    private markdownSvc: MarkdownService
  ) {}

  ngOnInit(): void {
    this.svc.getProjects().subscribe(ps => {
      this.projects = ps;
      console.log(this.projects[0] );
    })
  }

  getPhotoKeys(p: Project): string[] {
    return Object.keys(p.photos);
  }
}
