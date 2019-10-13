import { trigger, style, transition, animate, state, AnimationTriggerMetadata } from '@angular/animations';
import { MenuItem } from './menu.models';

/**
 * Definition for an sub menu.
 * Used for animation, to show two sub menus at the sliding time.
 * @hidden
 */
export interface SubMenu {
    /**
     * Sub menu to show.
     */
    subMenu: MenuItem[];
    /**
     * Label of parent menu item;
     */
    labelParentItem: string;
    /**
     * Set display to none if false.
     */
    isDisplayed: boolean;
}

/**
 * Slide animation definition.
 * @hidden
 */
const MENU_SLIDE_ANIMATION = '200ms cubic-bezier(0, 0.98, 0.96, 0.76)';

/**
 * Animation Triggers for the menu.
 * @hidden
 */
export const itlMenuAnimationTriggers: {
    /**
     * Animation trigger for enter / leave.
     * Used for animating the opening action of a new sub menu (`enter`).
     * And for animating the sliding out of a sub menu when navigating back to the parent menu (`leave`).
     */
    readonly enterLeaveTrigger: AnimationTriggerMetadata;
    /**
     * Animation trigger for show / hide.
     * Used for animating the sliding out of the current menu, when current menu becomes the parent menu (`hide`).
     * And for animating the sliding in of the parent menu, when an sub menu was closed, the parent becomes the current (`show`).
     */
    readonly hideShow: AnimationTriggerMetadata;
} = {

    enterLeaveTrigger: trigger('enterLeave', [
        transition(':enter', [
            style({ transform: 'translate3d(0%, 0, 0)' }),
            animate(MENU_SLIDE_ANIMATION, style({ transform: 'translate3d(-100%, 0, 0)' }))
        ]),
        transition(':leave', [
            style({ transform: 'translate3d(-100%, 0, 0)' }),
            animate(MENU_SLIDE_ANIMATION, style({ transform: 'translate3d(0%, 0, 0)' }))
        ])
    ]),
    hideShow: trigger('hideShow', [
        state('hide', style({ transform: 'translate3d(-100%, 0, 0)' })),
        state('show', style({ transform: 'none' })),
        transition('* => *', animate(MENU_SLIDE_ANIMATION)),
    ])
};
