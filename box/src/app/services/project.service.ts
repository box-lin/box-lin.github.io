import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { issuesUrl, projectLabel } from '../constants/service';
import { Project } from '../interface/project';
import { Issue } from '../interface/issue';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]>{
    return this.http.get<Issue[]>(issuesUrl).pipe(
      map((issues) =>
        issues
          .filter((issue) => issue.labels.some((label) => label.name === projectLabel))
          .map((issue) => JSON.parse(issue.body) as Project)
      )
    )
  }
}
