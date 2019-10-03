import { Directive, TemplateRef } from '@angular/core';

/**
 * Selector for the icon template of teh navigate back item.
 * Use this directive if you want use icons another way than as a class of an `<i></i>` element.
 *
 * @example Using mat-icon.
 *
 * ```html
 * <itl-menu [dataSource]="menuDataSource">
 *  <ng-template itlMenuNavigateBackIcon>
 *    <mat-icon>arrow_back</mat-icon>
 *  </ng-template>
 * </itl-menu>
 * ```
 */
@Directive({
  selector: 'ng-template[itlMenuNavigateBackIcon]'
})
export class MenuNavigateBackIconDirective {
  constructor(public template: TemplateRef<any>) { }
}
