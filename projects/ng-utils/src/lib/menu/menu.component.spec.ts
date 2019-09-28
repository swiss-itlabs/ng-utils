import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// Third lib
import { of } from 'rxjs';
// ng-utils
import { MenuComponent } from './menu.component';
import { MenuItemIconDirective } from './menu-item-icon.directive';
import { MenuItem } from './menu.models';

describe('MenuComponent', () => {

  describe('input / output', () => {
    let component: MenuComponent;
    let fixture: ComponentFixture<MenuComponent>;
    let nativeElement: HTMLElement;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [MenuComponent]
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

    it('should create default icon element', async(() => {
      component.dataSource = of<MenuItem[]>([{ label: 'Home', icon: 'fa-home' }]);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const menuIcon = nativeElement.querySelector('.itl-menu-item-icon');
        expect(menuIcon).toBeTruthy('no menu icon');
        expect(menuIcon.querySelector('i.fa-home')).toBeTruthy('no default icon element');
      });
    }));

    it('should have menu item id', async(() => {
      component.dataSource = of<MenuItem[]>([{ label: 'Home', id: 'home_menu' }]);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const menuItem = nativeElement.querySelector('#itl-menu-item-home_menu');
        expect(menuItem).toBeTruthy('no menu item with id');
      });
    }));

    it('should have a default menu item id', async(() => {
      component.dataSource = of<MenuItem[]>([
        { label: 'Home', id: 'home_menu' },
        { label: 'Settings' }
      ]);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const menuItem = nativeElement.querySelector('#itl-menu-item-1');
        expect(menuItem).toBeTruthy('no menu item with id');
        expect(menuItem.querySelector('.itl-menu-item-label').innerHTML).toBeTruthy('Settings');
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

  });

  describe('custom icon', () => {

    @Component({
      template: `
      <itl-menu [dataSource]="menuDataSource">
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
      public menuDataSource = of<MenuItem[]>([{ label: 'Home', icon: 'fa-home' }]);
    }

    let component: SimpleMenu;
    let fixture: ComponentFixture<SimpleMenu>;
    let nativeElement: HTMLElement;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [MenuComponent, SimpleMenu, MenuItemIconDirective]
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

  });
});


