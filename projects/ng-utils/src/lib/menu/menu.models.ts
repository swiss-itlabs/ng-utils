/**
 * Menu item model for the `itl-menu` data source.
 */
export interface MenuItem {
    /**
     * Optional, icon for the menu item.
     */
    icon?: string;
    /**
     * Text to show on the menu item.
     */
    label: string;
    /**
     * Optional, menu item identification.
     */
    id?: string;
}
