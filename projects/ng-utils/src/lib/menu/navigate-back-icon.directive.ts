import { Directive, TemplateRef } from '@angular/core';

/**
 * Selector for the icon template of a menu item.
 * Use this directive if you want use icons another way than as a class of an `<i></i>` element.
 *
 * @example Using mat-icon.
 *
 * ```html
 * <itl-menu [dataSource]="menuDataSource">
 *  <ng-template itlNavigateBackIcon>
 *    <mat-icon>arrow_back</mat-icon>
 *  </ng-template>
 * </itl-menu>
 * ```
 */
@Directive({
  selector: 'ng-template[itlNavigateBackIcon]'
})
export class NavigateBackIconDirective {
  constructor(public template: TemplateRef<any>) { }
}
