import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemoMenuComponent } from './demo-menu/demo-menu.component';


const routes: Routes = [
  { path: 'demo-menu', component: DemoMenuComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
