import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { DemoMenuComponent } from './demo-menu.component';
import { MenuModule } from '@itlabs/ng-utils';


@NgModule({
  declarations: [DemoMenuComponent],
  imports: [
    CommonModule,
    MenuModule,
    MatIconModule
  ]
})
export class DemoMenuModule { }
