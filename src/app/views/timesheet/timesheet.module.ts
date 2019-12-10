import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TimeSheetComponent } from './timesheet.component';
import { TimeSheetRoutingModule } from './timesheet-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MdcFabModule,
  MdcIconModule,
  MdcFormFieldModule,
  MdcTextFieldModule,
  MdcCardModule,
  MdcSelectModule,
  MdcListModule,
  MdcRadioModule,
  MdcButtonModule,
  MdcLinearProgressModule
} from '@angular-mdc/web';
import { AddComponent } from './add/add.component';

@NgModule({
  imports: [
    TimeSheetRoutingModule,
    AgGridModule.withComponents([]),
    MdcFabModule,
    MdcIconModule,
    MdcFormFieldModule,
    MdcTextFieldModule,
    MdcCardModule,
    MdcSelectModule,
    MdcListModule,
    MdcRadioModule,
    MdcButtonModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MdcLinearProgressModule
  ],
  declarations: [ TimeSheetComponent, AddComponent ],
})
export class TimesheetModule { }
