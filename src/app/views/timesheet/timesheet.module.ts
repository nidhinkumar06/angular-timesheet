import { NgModule } from '@angular/core';

import { TimeSheetComponent } from './timesheet.component';
import { TimeSheetRoutingModule } from './timesheet-routing.module';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  imports: [
    TimeSheetRoutingModule,
    AgGridModule.withComponents([])
  ],
  declarations: [ TimeSheetComponent ],
})
export class TimesheetModule { }
