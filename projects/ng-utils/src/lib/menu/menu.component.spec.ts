import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
// Third lib
import { of } from 'rxjs';
// ng-utils
import { MenuComponent } from './menu.component';
import { MenuItemIconDirective } from './menu-item-icon.directive';
import { MenuItem } from './menu.models';
import { SubMenuComponent } from './sub-menu/sub-menu.component';
import { MenuNavigateBackIconDirective } from './menu-navigate-back-icon.directive';


describe('MenuComponent', () => {

  describe('input / output', () => {
    let component: MenuComponent;
    let fixture: ComponentFixture<MenuComponent>;
    let nativeElement: HTMLElement;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [MenuComponent, SubMenuComponent],
        imports: [NoopAnimationsModule]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(MenuComponent);
      component = fixture.componentInstance;
      nativeElement = fixture.nativeElement;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should create menu items for dataSource', async(() => {
      component.dataSource = of<MenuItem[]>([{ label: 'Home' }]);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const menuItem = nativeElement.querySelector('.itl-menu-item');
        expect(menuItem).toBeTruthy('no menu item');

        const menuLabel = menuItem.querySelector('.itl-menu-item-label');
        expect(menuLabel).toBeTruthy('no menu item');
        expect(menuLabel.innerHTML).toEqual('Home');
      });
    }));

    it('should emit menu item on menu item click', (done) => {
      const menuItem = { label: 'Home', id: 'home_menu' };
      component.dataSource = of<MenuItem[]>([menuItem]);
      component.menuItemClick.subscribe(item => {
        expect(item).toBe(menuItem);
        done();
      });
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const menuItemElement = nativeElement.querySelector('#itl-menu-item-home_menu') as HTMLElement;
        menuItemElement.click();
      });
    });

    it('should navigate to sub menu', (done) => {
      const menuItem = { label: 'Home', id: 'home_menu', subMenu: [{ label: 'Settings', id: 'settings_menu' }] };
      component.dataSource = of<MenuItem[]>([menuItem]);
      component.menuItemClick.subscribe(item => {
        expect(item).toBe(menuItem);
        expect(component.openedSubMenus[1].subMenu).toEqual(menuItem.subMenu);
        done();
      });
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const menuItemElement = nativeElement.querySelector('#itl-menu-item-home_menu') as HTMLElement;
        menuItemElement.click();
      });
    });

  });

  describe('custom icon', () => {

    @Component({
      template: `
      <itl-menu [dataSource]="menuDataSource">
        <ng-template itlMenuNavigateBackIcon>
            <h2>Back</h2>
        </ng-template>
        <ng-template itlMenuItemIcon let-icon>
            <h1>{{icon}}</h1>
        </ng-template>
      </itl-menu>
      `
    })
    class SimpleMenu {
      /**
       * Fake data source.
       */
      public menuDataSource = of<MenuItem[]>([{ label: 'Home', icon: 'fa-home', id: 'home', subMenu: [{ label: 'Settings' }] }]);
    }

    let component: SimpleMenu;
    let fixture: ComponentFixture<SimpleMenu>;
    let nativeElement: HTMLElement;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [MenuComponent, SubMenuComponent, SimpleMenu, MenuItemIconDirective, MenuNavigateBackIconDirective],
        imports: [NoopAnimationsModule]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleMenu);
      component = fixture.componentInstance;
      nativeElement = fixture.nativeElement;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should contains custom menu icon', () => {
      const iconElement = nativeElement.querySelector('.itl-menu-item-icon');
      expect(iconElement).toBeTruthy();
      expect(iconElement.querySelector('h1').innerHTML).toBeTruthy('fa-home');
    });

    it('should contains custom navigate back icon', async(() => {
      const homeMenuItem = nativeElement.querySelector('#itl-menu-item-home') as HTMLElement;
      homeMenuItem.click();
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        const iconElement = nativeElement.querySelector('.itl-menu-item-navigate-back > .itl-menu-item-icon');
        expect(iconElement).toBeTruthy();
        expect(iconElement.querySelector('h2').innerHTML).toBeTruthy('Back');
      });
    }));
  });
});


