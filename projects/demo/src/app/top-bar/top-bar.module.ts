import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

import { TopBarComponent } from './top-bar.component';



@NgModule({
  declarations: [TopBarComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule
  ],
  exports: [TopBarComponent]
})
export class TopBarModule { }
