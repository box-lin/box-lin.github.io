import { Routes } from '@angular/router';
import { ProjectListComponent } from './ui/project-list/project-list.component';
import { PostListComponent } from './ui/post-list/post-list.component';
import { HomepageComponent } from './ui/homepage/homepage.component';

export const routes: Routes = [
    { path: "", component: HomepageComponent },
    { path: "project", component: ProjectListComponent },
    { path: "post", component: PostListComponent}
];
