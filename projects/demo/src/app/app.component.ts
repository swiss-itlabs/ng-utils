import { Component } from '@angular/core';

@Component({
  selector: 'itldemo-root',
  template: `
    <itldemo-top-bar></itldemo-top-bar>
    <div class="container">
     <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
  .container {
    margin: 16px;
  };
  `]
})
export class AppComponent { }
