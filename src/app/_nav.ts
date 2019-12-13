import { Role } from './models';

// import { INavData } from '../../dist/@coreui/angular';

export const navItems: any[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    allowedRoles: [Role.Admin, Role.User]
  },
  {
    name: 'List',
    url: '/timesheet',
    icon: 'icon-speedometer',
    allowedRoles: [Role.Admin, Role.User]
  },
  {
    name: 'Users',
    url: '/users',
    icon: 'icon-user',
    allowedRoles: [Role.Admin]
  },
  // {
  //   name: 'GridHttp',
  //   url: '/gridserver',
  //   icon: 'icon-speedometer'
  // }
];
