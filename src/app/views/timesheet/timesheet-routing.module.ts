import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimeSheetComponent } from './timesheet.component';
import { AddComponent } from './add/add.component';


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
export class TimeSheetRoutingModule {}
