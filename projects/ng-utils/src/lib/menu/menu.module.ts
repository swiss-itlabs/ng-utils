import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// ng-utils
import { MenuComponent } from './menu.component';
import { MenuItemIconDirective } from './menu-item-icon.directive';
import { NavigateBackIconDirective } from './navigate-back-icon.directive';


/**
 * Exports the unstyled `itl-menu` component.
 */
@NgModule({
  declarations: [MenuComponent, MenuItemIconDirective, NavigateBackIconDirective],
  imports: [
    CommonModule
  ],
  exports: [MenuComponent, MenuItemIconDirective, NavigateBackIconDirective]
})
export class MenuModule { }
