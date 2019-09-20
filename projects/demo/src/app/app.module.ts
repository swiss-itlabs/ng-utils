import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarModule } from './top-bar/top-bar.module';
import { DemoMenuModule } from './demo-menu/demo-menu.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    TopBarModule,
    DemoMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
