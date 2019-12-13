import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { AuthGuard } from '../../helpers';
import { Role } from '../../models';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Users',
            roles: [Role.Admin]
        },
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: 'users'
            },
            {
                path: 'users',
                component: ListComponent,
                data: {
                    title: 'List'
                }
            },
            {
                path: 'add',
                component: AddComponent,
                data: {
                    title: 'Add'
                }
            }
        ],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class UsersRoutingModule {}
