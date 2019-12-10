import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AggridHttpComponent } from './aggrid-http.component';

const routes: Routes = [
  {
    path: '',
    component: AggridHttpComponent,
    data: {
      title: 'GridHttp'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgGridHttpRoutingModule {}
