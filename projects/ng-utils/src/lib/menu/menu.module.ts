import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MenuItemIconDirective } from './menu-item-icon.directive';


/**
 * Exports the unstyled `itl-menu` component.
 */
@NgModule({
  declarations: [MenuComponent, MenuItemIconDirective],
  imports: [
    CommonModule
  ],
  exports: [MenuComponent, MenuItemIconDirective]
})
export class MenuModule { }
