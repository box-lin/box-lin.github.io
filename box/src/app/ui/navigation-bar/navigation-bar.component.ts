import { Component } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { NgClass } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [NgbNavModule, MatToolbarModule, MatButtonModule, NgClass, RouterModule, MatTab, MatTabGroup],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent {

}
