import {Component} from '@angular/core';

import { navItems } from '../../_nav';
import { AuthenticationService } from '../../services';
import { Router } from '@angular/router';
import { User } from '../../models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  minimized = false;
  currentUser: User;

  // public navItems = [...navItems];
  public navItems = [];

  constructor(private authService: AuthenticationService, private router: Router) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
    navItems.map((navItem) => {
      if (navItem.allowedRoles.includes(this.currentUser.role)) {
        this.navItems.push(navItem);
      }
    });
  }

  toggleMinimize(e) {
    this.minimized = e;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
