import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// ng-utils
import { MenuComponent } from './menu.component';
import { MenuItemIconDirective } from './menu-item-icon.directive';
import { MenuNavigateBackIconDirective } from './menu-navigate-back-icon.directive';
import { SubMenuComponent } from './sub-menu/sub-menu.component';


/**
 * Exports the unstyled `itl-menu` component.
 */
@NgModule({
  declarations: [MenuComponent, MenuItemIconDirective, MenuNavigateBackIconDirective, SubMenuComponent],
  imports: [
    CommonModule
  ],
  exports: [MenuComponent, MenuItemIconDirective, MenuNavigateBackIconDirective]
})
export class MenuModule { }
