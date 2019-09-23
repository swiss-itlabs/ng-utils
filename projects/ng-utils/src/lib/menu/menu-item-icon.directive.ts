import { Directive, TemplateRef } from '@angular/core';

/**
 * Selector for the icon template of a menu item.
 * Use this directive if you want use icons another way than as a class of an `<i></i>` element.
 *
 * @example Using mat-icon.
 *
 * ```html
 * <itl-menu [dataSource]="menuDataSource" (menuItemClick)="onMenuItemClick($event)">
 *  <ng-template itlMenuItemIcon let-icon>
 *    <mat-icon>{{icon}}</mat-icon>
 *  </ng-template>
 * </itl-menu>
 * ```
 */
@Directive({
  selector: 'ng-template[itlMenuItemIcon]'
})
export class MenuItemIconDirective {
  constructor(public template: TemplateRef<any>) { }
}
