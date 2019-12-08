import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimeSheetComponent } from './timesheet.component';

const routes: Routes = [
  {
    path: '',
    component: TimeSheetComponent,
    data: {
      title: 'Timesheet'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimeSheetRoutingModule {}
