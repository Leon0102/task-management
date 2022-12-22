import { Component, NgModule, Output, Input, EventEmitter, ViewChild, ElementRef, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { ItemClickEvent } from 'devextreme/ui/tree_view';
import { DxTreeViewModule, DxTreeViewComponent } from 'devextreme-angular/ui/tree-view';
import { navigation } from '../../../app-navigation';
import { UserPanelModule } from '../user-panel/user-panel.component';

import * as events from 'devextreme/events';
import { AuthService, IUser } from '../../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-navigation-menu',
  templateUrl: './side-navigation-menu.component.html',
  styleUrls: ['./side-navigation-menu.component.scss']
})
export class SideNavigationMenuComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(DxTreeViewComponent, { static: true })
  menu!: DxTreeViewComponent;

  @Output()
  selectedItemChanged = new EventEmitter<ItemClickEvent>();

  @Output()
  openMenu = new EventEmitter<any>();

  @Output()
  menuToggle = new EventEmitter<boolean>();

  private _selectedItem!: String;

  user: IUser | null = { email: '' };

  userMenuItems = [{
    text: 'Profile',
    icon: 'user',
    onClick: () => {
      console.log('Profile');
      this.router.navigate(['/profile']);
    }
  },
  {
    text: 'Logout',
    icon: 'runner',
    onClick: () => {
      this.authService.logOut();
    }
  }];

  @Input()
  set selectedItem(value: String) {
    this._selectedItem = value;
    if (!this.menu.instance) {
      return;
    }

    this.menu.instance.selectItem(value);
  }

  private _items!: Record<string, unknown>[];
  get items() {
    if (!this._items) {
      this._items = navigation.map((item) => {
        if (item.path && !(/^\//.test(item.path))) {
          item.path = `/${item.path}`;
        }
        return { ...item, expanded: !this._compactMode }
      });
    }

    return this._items;
  }

  private _compactMode = false;
  @Input()
  get compactMode() {
    return this._compactMode;
  }
  set compactMode(val) {
    this._compactMode = val;

    if (!this.menu.instance) {
      return;
    }

    if (val) {
      this.menu.instance.collapseAll();
    } else {
      this.menu.instance.expandItem(this._selectedItem);
    }
  }

  constructor(private authService: AuthService,
    private elementRef: ElementRef,
    private router: Router) { }

  onItemClick(event: ItemClickEvent) {
    this.selectedItemChanged.emit(event);
  }

  ngAfterViewInit() {
    events.on(this.elementRef.nativeElement, 'dxclick', (e: Event) => {
      this.openMenu.next(e);
    });
  }

  ngOnInit() {
    this.authService.getUser().then((e) => this.user = e.data);
  }

  ngOnDestroy() {
    events.off(this.elementRef.nativeElement, 'dxclick');
  }

  logout() {
    this.menuToggle.emit(true);
  }
}

@NgModule({
  imports: [DxTreeViewModule, UserPanelModule],
  declarations: [SideNavigationMenuComponent],
  exports: [SideNavigationMenuComponent]
})
export class SideNavigationMenuModule { }
