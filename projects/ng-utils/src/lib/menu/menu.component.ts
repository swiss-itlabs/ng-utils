import {
  Component,
  Input,
  ContentChild,
  ViewEncapsulation,
  HostBinding,
  TemplateRef,
  Output,
  EventEmitter
} from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { MenuItem } from './menu.models';
import { MenuItemIconDirective } from './menu-item-icon.directive';


/**
 * Unstyled responsive menu with a fully-templated API.
 *
 * ### Styling
 *
 * Following is the list of structural style classes:
 *
 * | Name               | Element                              |
 * |--------------------|--------------------------------------|
 * | itl-menu           | Host element                         |
 * | itl-menu-item      | Menu item, wrapper of icon and label |
 * | itl-menu-item-icon | Icon element of a menu item          |
 *
 *
 * @example Simplest way with e.g Font Awesome.
 *
 * ```ts
 * @Component({
 *  selector: 'itldemo-demo-menu',
 *  template: `
 *              <itl-menu [dataSource]="menuDataSource" (menuItemClick)="onMenuItemClick($event)">
 *              </itl-menu>
 *            `
 * })
 * export class DemoMenuComponent {
 *  public menuDataSource: Observable<MenuItem[]> = of([
 *    { icon: 'fa fa-users', label: 'Users' },
 *    { icon: 'fa fa-calendar-week', label: 'Calendar' }
 *  ]);
 *
 *  public onMenuItemClick(menuItem: MenuItem): void {
 *    // invoke action for menu item...
 *  }
 * }
 * ```
 *
 * @example Use custom icon template.
 *
 * ```html
 * <itl-menu [dataSource]="menuDataSource" (menuItemClick)="onMenuItemClick($event)">
 *  <ng-template itlMenuItemIcon let-icon>
 *    <mat-icon>{{icon}}</mat-icon>
 *  </ng-template>
 * </itl-menu>
 * ```
 *
 */
@Component({
  selector: 'itl-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MenuComponent {

  /**
   * Reference to the menu item icon template.
   * @hidden
   */
  @ContentChild(MenuItemIconDirective, { static: false })
  public menuItemIcon: MenuItemIconDirective;

  /**
   * Gets the template reference of `menuItemIcon`.
   * @hidden
   */
  public get menuItemIconTemplate(): TemplateRef<any> {
    return this.menuItemIcon ? this.menuItemIcon.template : null;
  }

  /**
   * Bind css class `itl-menu` to host.
   * @hidden
   */
  @HostBinding('class')
  public readonly class = 'itl-menu';

  /**
   * Menu's source of data, a stream that emits a data array each time the array changes.
   */
  @Input()
  public dataSource: Observable<MenuItem[]>;

  /**
   * Event emitted when menu item has been clicked.
   */
  @Output()
  public menuItemClick: EventEmitter<MenuItem> = new EventEmitter<MenuItem>();

  constructor() { }

  /**
   * Event handler of the internal menu item click event.
   * Emits the `menuItemClick` event.
   * @param menuItem Clicked menu item.
   *
   * @hidden
   */
  public onClickMenuItem(menuItem: MenuItem): void {
    this.menuItemClick.emit(menuItem);
  }

  /**
   * Get a the menu item id.
   * @param menuItem Menu item to generate id for.
   */
  public getItemId(menuItem: MenuItem): Observable<string> {
    const itemId = menuItem.id ? of(menuItem.id) : this.dataSource.pipe(map(items => items.indexOf(menuItem).toString()));
    return itemId.pipe(map(id => `itl-menu-item-${id}`));
  }

}
