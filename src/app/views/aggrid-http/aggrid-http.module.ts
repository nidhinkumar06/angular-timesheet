import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule } from '@angular/common/http';

// import { AgGridModule } from 'ag-grid-angular';
import { AgGridModule } from 'ag-grid-angular';

import { AggridHttpComponent } from './aggrid-http.component';
import { AgGridHttpRoutingModule } from './aggrid-http-routing.module';

@NgModule({
  imports: [
    AgGridHttpRoutingModule,
    FormsModule, // <-- import the FormsModule before binding with [(ngModel)]
    HttpClientModule,
    AgGridModule.withComponents([])
  ],
  declarations: [ AggridHttpComponent ],
})
export class AgGridHttpModule { }
