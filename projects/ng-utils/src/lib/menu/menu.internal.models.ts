import { MenuItem } from './menu.models';

/**
 * Definition for navigation history data.
 * @hidden
 */
export interface NavigationHistory {
    /**
     * Previous sub menu.
     */
    previousSubMenu: MenuItem[];
    /**
     * Label of parent menu item;
     */
    labelParentItem: string;
}
