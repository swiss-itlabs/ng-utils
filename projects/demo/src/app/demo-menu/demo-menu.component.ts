import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MenuItem } from '@itlabs/ng-utils';

@Component({
  selector: 'itldemo-demo-menu',
  templateUrl: './demo-menu.component.html',
  styleUrls: ['./demo-menu.component.scss']
})
export class DemoMenuComponent implements OnInit {

  public menuDataSource: Observable<MenuItem[]> = of([
    { icon: 'work', label: 'Customers' },
    { icon: 'people_alt', label: 'Users' },
    { icon: 'today', label: 'Calendar' },
    {
      label: 'Other things', id: 'OT', subMenu: [
        {
          icon: 'list', label: 'Level 2', subMenu: [
            { icon: 'tab', label: 'Level 3, Item 1' },
            { icon: 'view_module', label: 'Level 3, Item 2' },
          ]
        },
      ]
    }
  ]);

  constructor() {

  }

  public ngOnInit(): void {

  }


  public onMenuItemClick(menuItem: MenuItem): void {
    console.log(menuItem);
  }

}
