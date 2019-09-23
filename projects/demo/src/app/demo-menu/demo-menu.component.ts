import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
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
    { label: 'Other things' }
  ]);

  constructor() {

  }

  public ngOnInit(): void {

  }


  public onMenuItemClick(menuItem: MenuItem): void {
    console.log(menuItem);
  }

}
