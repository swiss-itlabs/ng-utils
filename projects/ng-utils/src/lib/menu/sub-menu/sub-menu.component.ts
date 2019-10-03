import { Component, Input, EventEmitter, Output, TemplateRef } from '@angular/core';
import { MenuItem } from '../menu.models';

/**
 * Component to represent a sub menu (or the root menu list).
 * It's just a helper component to make slide navigation easier.
 * @hidden
 */
@Component({
  selector: 'itl-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.scss']
})
export class SubMenuComponent {

  /**
   * Source of data for the current menu level.
   */
  @Input()
  public dataSource: MenuItem[];

  /**
   * Label of the parent menu item, if current data source is a sub menu.
   */
  @Input()
  public labelParentMenuItem: string;

  /**
   * CSS class for the navigate back icon.
   * Use the `itlNavigateBackIcon` template directive, if don't use CSS icons.
   */
  @Input()
  public navigateBackIconClass: string;

  /**
   * Template for the navigate back icon.
   */
  @Input()
  public navigateBackIconTemplate: TemplateRef<any>;

  /**
   * Template for menu item icons.
   */
  @Input()
  public menuItemIconTemplate: TemplateRef<any>;

  /**
   * Event emitted when menu item has been clicked.
   */
  @Output()
  public menuItemClick: EventEmitter<MenuItem> = new EventEmitter<MenuItem>();

  /**
   * Event emitted when navigate back item has been clicked.
   */
  @Output()
  public navigateBackClick: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Event handler of the menu item click event.
   * Emits the `menuItemClick` event.
   * @param menuItem Clicked menu item.
   */
  public onClickMenuItem(menuItem: MenuItem): void {
    this.menuItemClick.emit(menuItem);
  }

  /**
   * Event handler of navigate back button.
   */
  public onClickBack(): void {
    this.navigateBackClick.emit();
  }

  /**
   * Get the menu item id.
   * @param menuItem Menu item to generate id for.
   */
  public getItemId(menuItem: MenuItem): string {
    const itemId = menuItem.id ? menuItem.id : this.dataSource.indexOf(menuItem).toString();
    return `itl-menu-item-${itemId}`;
  }

}
