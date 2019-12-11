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
  MdcLinearProgressModule,
  MdcDialogModule
} from '@angular-mdc/web';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { Data } from '../../app.storage';

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
    MdcLinearProgressModule,
    MdcDialogModule
  ],
  declarations: [ TimeSheetComponent, AddComponent, EditComponent ],
  providers: [Data]
})
export class TimesheetModule { }
