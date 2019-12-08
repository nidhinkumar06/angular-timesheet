import { TimeSheetService } from './timesheet.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  templateUrl: 'timesheet.component.html'
})
export class TimeSheetComponent implements OnInit {

  columnDefs = [
    {
      headerName: 'S.No',
      field: 'id',
      sortable: true,
      filter: true,
      width: 100,
      checkboxSelection: function (params) {
        return params.columnApi.getRowGroupColumns().length === 0;
      },
      headerCheckboxSelection: function (params) {
        return params.columnApi.getRowGroupColumns().length === 0;
      }
    },
    { headerName: 'Date', field: 'Timestamp', width: 150, sortable: true, filter: true },
    { headerName: 'Name', field: 'Name', sortable: true, filter: true },
    { headerName: 'Phase', field: 'Phase', sortable: true, filter: true },
    { headerName: 'Project', field: 'Project', sortable: true, filter: true },
    { headerName: 'Hours Worked', field: 'hrs', sortable: true, filter: true },
    { headerName: 'Task', field: 'Task', sortable: true, filter: true },
    { headerName: 'Workfrom', field: 'Workfrom', sortable: true, filter: true },
  ];

  rowData = [];

  // columnDefs = [
  //   { headerName: 'Make', field: 'make', sortable: true, filter: true },
  //   { headerName: 'Model', field: 'model', sortable: true, filter: true },
  //   { headerName: 'Price', field: 'price', sortable: true, filter: true }
  // ];

  // rowData = [
  //   { make: 'Toyota', model: 'Celica', price: 35000 },
  //   { make: 'Ford', model: 'Mondeo', price: 32000 },
  //   { make: 'Porsche', model: 'Boxter', price: 72000 },
  //   { make: 'Porsche', model: 'Boxter', price: 72000 },
  //   { make: 'Porsche', model: 'Boxter', price: 72000 },
  //   { make: 'Porsche', model: 'Boxter', price: 72000 },
  //   { make: 'Porsche', model: 'Boxter', price: 72000 },
  //   { make: 'Porsche', model: 'Boxter', price: 72000 },
  //   { make: 'Porsche', model: 'Boxter', price: 72000 },
  //   { make: 'Porsche', model: 'Boxter', price: 72000 },
  //   { make: 'Porsche', model: 'Boxter', price: 72000 },
  //   { make: 'Porsche', model: 'Boxter', price: 72000 },
  //   { make: 'Porsche', model: 'Boxter', price: 72000 },
  //   { make: 'Porsche', model: 'Boxter', price: 72000 },
  //   { make: 'Porsche', model: 'Boxter', price: 72000 },
  //   { make: 'Porsche', model: 'Boxter', price: 72000 },
  //   { make: 'Porsche', model: 'Boxter', price: 72000 },
  //   { make: 'Porsche', model: 'Boxter', price: 72000 },
  //   { make: 'Porsche', model: 'Boxter', price: 72000 },
  //   { make: 'Porsche', model: 'Boxter', price: 72000 }
  // ];

  constructor(private timesheetService: TimeSheetService) { }

  ngOnInit() {
    this.getTimeSheetList();
  }

  getTimeSheetList() {
    this.timesheetService.getTimeSheetList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => {
          const hrs = c.payload.val().hrs === '-' ? '0' : c.payload.val().hrs;
          const date = new Date(null);
          date.setSeconds(parseInt(hrs, 10));
          const totalHrs = date.toISOString().substr(11, 8);
          return (
            {
              id: c.payload.val().id,
              Name: c.payload.val().Name,
              Phase: c.payload.val().Phase,
              Project: c.payload.val().Project,
              Task: c.payload.val().Task,
              Timestamp: moment(c.payload.val().Timestamp).format('DD-MM-YYYY'),
              Workfrom: c.payload.val().Workfrom,
              hrs: totalHrs
             }
          );
        }
        )
      )
    ).subscribe(datas => {
      this.rowData = datas;
    });
  }
}
