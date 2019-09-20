import { Component } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Navigation bar of the demo application.
 */
@Component({
  selector: 'itldemo-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {

  constructor(private router: Router) { }

  public onMenuItemClick(url: string): void {
    this.router.navigateByUrl(url);
  }
}
