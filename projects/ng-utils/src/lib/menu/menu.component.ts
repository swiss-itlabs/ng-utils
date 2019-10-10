import {
  Component,
  Input,
  ContentChild,
  ViewEncapsulation,
  TemplateRef,
  Output,
  EventEmitter,
  AfterViewInit,
  ElementRef,
  ViewChildren,
  QueryList
} from '@angular/core';
// Third lib
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
// ng-utils
import { MenuItem } from './menu.models';
import { MenuItemIconDirective } from './menu-item-icon.directive';
import { SubMenu, itlMenuAnimationTriggers } from './menu.internal.models';
import { MenuNavigateBackIconDirective } from './menu-navigate-back-icon.directive';


/**
 * Unstyled responsive menu with a fully-templated API.
 *
 * ### Styling
 *
 * Following is the list of structural style classes:
 *
 * | Name                        | Element                                                             |
 * |-----------------------------|---------------------------------------------------------------------|
 * | itl-menu                    | `ul` as menu element.                                               |
 * | itl-menu-item               | `li` as menu item, wrapper of icon and label.                       |
 * | itl-menu-item-icon          | `span` element containing the icon of the menu item.                |
 * | itl-menu-item-label         | `span` element containing the label of the menu item.               |
 * | itl-menu-item-navigate-back | `li` as navigate back item, only visible if a sub menu is opened.   |
 *
 *
 * @example Simplest way with CSS icons e.g Font Awesome.
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
 *  <ng-template itlMenuNavigateBackIcon>
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
  encapsulation: ViewEncapsulation.None,
  animations: [
    itlMenuAnimationTriggers.hideShow,
    itlMenuAnimationTriggers.enterLeaveTrigger
  ]
})
export class MenuComponent implements AfterViewInit {

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
   * Reference to the navigate back icon template.
   * @hidden
   */
  @ContentChild(MenuNavigateBackIconDirective, { static: false })
  public navigateBackIcon: MenuNavigateBackIconDirective;

  /**
   * Gets the template reference of `navigateBackIcon`.
   * @hidden
   */
  public get navigateBackIconTemplate(): TemplateRef<any> {
    return this.navigateBackIcon ? this.navigateBackIcon.template : null;
  }

  /**
   * Reference to the sub menus.
   * @hidden
   */
  @ViewChildren('subMenus', { read: ElementRef })
  public subMenus: QueryList<ElementRef<HTMLElement>>;

  /**
   * History of sub menu navigation.
   * @hidden
   */
  public openedSubMenus: SubMenu[] = [];

  /**
   * Index of current sub menu. @see s `openedSubMenus`
   *
   * @hidden
   */
  public selectedIndex = 0;

  /**
   * Prevent enter animation of the root menu.
   * Is set to `true` after view init.
   * @hidden
   */
  public isReadyForAnimation = false;

  /**
   * Width of sub menu.
   * Used to bind the with to the `itl-menu-container`.
   * @hidden
   */
  public subMenuWidth = 'auto';

  /**
   * Menu's source of data, a stream that emits a data array each time the array changes.
   */
  @Input()
  public set dataSource(ds: Observable<MenuItem[]>) {
    this._dataSource = ds;
    this.openedSubMenus = [];
    if (ds) {
      ds.subscribe(items => this.openedSubMenus.push({ subMenu: items, labelParentItem: null, isDisplayed: true }));
    }
  }
  public get dataSource(): Observable<MenuItem[]> {
    return this._dataSource;
  }

  /**
   * CSS class for the navigate back icon.
   * See [*itlMenuNavigateBackIcon*](menuNavigateBackIconDirective.html) for alternative way to provide a navigate back icon.
   */
  @Input()
  public navigateBackIconClass: string;

  /**
   * Event emitted when menu item has been clicked.
   */
  @Output()
  public menuItemClick: EventEmitter<MenuItem> = new EventEmitter<MenuItem>();

  /**
   * Set to `true` if sliding animation should be disabled.
   */
  @Input()
  public animationDisabled = false;

  /**
   * Bind sub menu with to `itl-menu-container`.
   * @hidden
   */
  public ngAfterViewInit(): void {

    // if view is initialized and still no sub menus, need to register to the first change of subMenus to init animation
    if (this.openedSubMenus.length === 0) {
      this.subMenus.changes
        .pipe(take(1))
        .subscribe(() => {
          this.initAnimation();
        });
    } else {
      this.initAnimation();
    }
  }

  /**
   * Event handler of the menu item click event.
   * Emits the `menuItemClick` event.
   * @param menuItem Clicked menu item.
   *
   * @hidden
   */
  public onMenuItemClick(menuItem: MenuItem): void {
    if (menuItem.subMenu && menuItem.subMenu.length > 0) {
      this.openedSubMenus.push({ subMenu: menuItem.subMenu, labelParentItem: menuItem.label, isDisplayed: true });
      this.selectedIndex++;
    }
    this.menuItemClick.emit(menuItem);
  }

  /**
   * Event handler of navigate back button.
   * @hidden
   */
  public onNavigateBackClick(): void {
    this.openedSubMenus.splice(this.openedSubMenus.length - 1, 1);
    this.selectedIndex--;
    this.openedSubMenus[this.selectedIndex].isDisplayed = true;
  }

  /**
   * Call back when sub menu animation is done.
   * Used to hide parent sub menu. So the new sub menu can use the position of the previous one.
   * @param index Index of animated sub menu.
   *
   * @hidden
   */
  public animationDone(index: number): void {
    if (this.selectedIndex !== 0 && this.selectedIndex !== index) {
      const subMenu = this.openedSubMenus[index];
      if (subMenu) {
        subMenu.isDisplayed = false;
      }
    }
  }

  /**
   * Get animation action for sub menu.
   * Returns 'hide' if is opening a new sub menu or 'show' if is navigating back to parent menu.
   * @param index Index of opened sub menu.
   *
   * @hidden
   */
  public getAnimationAction(index: number): string {
    const position = index - this.selectedIndex;
    if (position < 0) {
      return 'hide';
    }
    return 'show';
  }

  /**
   * Bind sub menu with to `itl-menu-container` and allow animation.
   */
  private initAnimation(): void {
    setTimeout(() => {
      this.subMenuWidth = this.subMenus.first.nativeElement.clientWidth + 'px';
      this.isReadyForAnimation = true;
    });
  }

}
