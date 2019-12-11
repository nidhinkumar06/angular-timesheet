import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimeSheetComponent } from './timesheet.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Timesheet'
    },
    children: [
      {
        path: '',
        redirectTo: 'timesheet'
      },
      {
        path: 'timesheet',
        component: TimeSheetComponent,
        data: {
          title: 'List'
        }
      },
      {
        path: 'add/:id',
        component: AddComponent,
        data: {
          title: 'Add'
        }
      },
      {
        path: 'edit/:id',
        component: EditComponent,
        data: {
          title: 'Edit'
        }
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimeSheetRoutingModule {}
