import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubMenuComponent } from './sub-menu.component';

describe('SubMenuComponent', () => {

  let component: SubMenuComponent;
  let fixture: ComponentFixture<SubMenuComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubMenuComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubMenuComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create menu items for dataSource', async(() => {
    component.dataSource = [{ label: 'Home' }];
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
    component.dataSource = [{ label: 'Home', icon: 'fa-home' }];
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const menuIcon = nativeElement.querySelector('.itl-menu-item-icon');
      expect(menuIcon).toBeTruthy('no menu icon');
      expect(menuIcon.querySelector('i.fa-home')).toBeTruthy('no default icon element');
    });
  }));

  it('should have menu item id', async(() => {
    component.dataSource = [{ label: 'Home', id: 'home_menu' }];
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const menuItem = nativeElement.querySelector('#itl-menu-item-home_menu');
      expect(menuItem).toBeTruthy('no menu item with id');
    });
  }));

  it('should have a default menu item id', async(() => {
    component.dataSource = [
      { label: 'Home', id: 'home_menu' },
      { label: 'Settings' }
    ];
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const menuItem = nativeElement.querySelector('#itl-menu-item-1');
      expect(menuItem).toBeTruthy('no menu item with id');
      expect(menuItem.querySelector('.itl-menu-item-label').innerHTML).toBeTruthy('Settings');
    });
  }));

  it('should emit menu item on menu item click', (done) => {
    const menuItem = { label: 'Home', id: 'home_menu' };
    component.dataSource = [menuItem];
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

  it('should show navigate back icon and emit event on click', (done) => {
    const menuItem = { label: 'Permissions' };
    component.dataSource = [menuItem];
    component.labelParentMenuItem = 'Users';
    component.navigateBackClick.subscribe(() => {
      done();
    });
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const navigateBackItem = nativeElement.querySelector('.itl-menu-item-navigate-back') as HTMLElement;
      expect(navigateBackItem).toBeDefined('no navigate back item');
      navigateBackItem.click();
    });
  });

});
