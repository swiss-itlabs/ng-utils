import {
  Component,
  Input,
  ContentChild,
  ViewEncapsulation,
  TemplateRef,
  Output,
  EventEmitter
} from '@angular/core';
// Third lib
import { Observable } from 'rxjs';
// ng-utils
import { MenuItem } from './menu.models';
import { MenuItemIconDirective } from './menu-item-icon.directive';
import { NavigationHistory } from './menu.internal.models';
import { NavigateBackIconDirective } from './navigate-back-icon.directive';


/**
 * Unstyled responsive menu with a fully-templated API.
 *
 * ### Styling
 *
 * Following is the list of structural style classes:
 *
 * | Name                | Element                                                             |
 * |---------------------|---------------------------------------------------------------------|
 * | itl-menu            | `ul` as menu element.                                               |
 * | itl-menu-item       | `li` as menu item, wrapper of icon and label.                       |
 * | itl-menu-item-icon  | `span` element containing the icon of the menu item.                |
 * | itl-menu-item-label | `span` element containing the label of the menu item.               |
 *
 *
 * @example Simplest way with e.g Font Awesome.
 *
 * ```ts
 * @Component({
 *  selector: 'itldemo-demo-menu',
 *  template: `
 *              <itl-menu [dataSource]="menuDataSource" (menuItemClick)="onMenuItemClick($event)"
 *                        navigateBackIconClass="fa fa-back">
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
 *  <ng-template itlNavigateBackIcon>
 *    <mat-icon>arrow_back</mat-icon>
 *  </ng-template>
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
   * Value of `dataSource` getter / setter.
   */
  private _dataSource: Observable<MenuItem[]>;

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
   * Reference to the naviagte back icon template.
   * @hidden
   */
  @ContentChild(NavigateBackIconDirective, { static: false })
  public navigateBackIcon: NavigateBackIconDirective;

  /**
   * Gets the template reference of `navigateBackIcon`.
   * @hidden
   */
  public get navigateBackIconTemplate(): TemplateRef<any> {
    return this.navigateBackIcon ? this.navigateBackIcon.template : null;
  }

  /**
   * Currently visible menu items.
   */
  public currentMenuItems: MenuItem[];

  /**
   * History of sub menu items opening.
   * @hidden
   */
  public navigationHistory: NavigationHistory[] = [];

  /**
   * Gets the label of the current parent menu item.
   * Returns null if no parent menu.
   * @hidden
   */
  public get labelParentMenuItem(): string {
    if (this.navigationHistory.length > 0) {
      return this.navigationHistory[this.navigationHistory.length - 1].labelParentItem;
    }
    return null;
  }

  /**
   * Menu's source of data, a stream that emits a data array each time the array changes.
   */
  @Input()
  public set dataSource(ds: Observable<MenuItem[]>) {
    this._dataSource = ds;
    if (ds) {
      ds.subscribe(items => this.currentMenuItems = items);
    } else {
      this.currentMenuItems = [];
    }
  }
  public get dataSource(): Observable<MenuItem[]> {
    return this._dataSource;
  }

  /**
   * CSS class of the navigate back icon.
   * You can also use the `itlNavigateBackIcon` template directive instead.
   */
  @Input()
  public navigateBackIconClass: string;

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
    if (menuItem.subMenu && menuItem.subMenu.length > 0) {
      this.navigationHistory.push({ previousSubMenu: this.currentMenuItems, labelParentItem: menuItem.label });
      this.currentMenuItems = menuItem.subMenu;
    }
    this.menuItemClick.emit(menuItem);
  }

  /**
   * Event handler of navigate back button.
   * @hidden
   */
  public onClickBack(): void {
    const prev = this.navigationHistory.splice(this.navigationHistory.length - 1, 1);
    this.currentMenuItems = prev[0].previousSubMenu;
  }

  /**
   * Get a the menu item id.
   * @param menuItem Menu item to generate id for.
   */
  public getItemId(menuItem: MenuItem): string {
    const itemId = menuItem.id ? menuItem.id : this.currentMenuItems.indexOf(menuItem).toString();
    return `itl-menu-item-${itemId}`;
  }

}
