import { Component } from '@angular/core';

@Component({
  selector: 'itldemo-root',
  template: `
    <itldemo-top-bar></itldemo-top-bar>
     <router-outlet></router-outlet>
  `,
})
export class AppComponent { }
