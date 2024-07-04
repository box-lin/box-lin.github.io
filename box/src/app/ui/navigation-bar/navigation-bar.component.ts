import { Component } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { NgClass } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [NgbNavModule, MatToolbarModule, MatButtonModule, NgClass, RouterModule],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent {

}
