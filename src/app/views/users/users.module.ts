import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { UsersRoutingModule } from './user-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AgGridModule } from 'ag-grid-angular';
import {
  MdcIconModule,
  MdcFabModule,
  MdcLinearProgressModule,
  MdcFormFieldModule,
  MdcTextFieldModule,
  MdcButtonModule
} from '@angular-mdc/web';


@NgModule({
  declarations: [ListComponent, AddComponent],
  imports: [
    AgGridModule.withComponents([]),
    UsersRoutingModule,
    MdcFabModule,
    MdcIconModule,
    MdcLinearProgressModule,
    MdcFormFieldModule,
    MdcTextFieldModule,
    MdcButtonModule,
    ReactiveFormsModule,
    CommonModule,
  ]
})
export class UsersModule { }
