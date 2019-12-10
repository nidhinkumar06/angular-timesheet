import { TimeSheetService } from './timesheet.service';
import { Component, OnInit } from '@angular/core';
import { map, max } from 'rxjs/operators';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'timesheet.component.html'
})
export class TimeSheetComponent implements OnInit {

  rowClassRules;

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

  constructor(private timesheetService: TimeSheetService, private router: Router) {
    this.rowClassRules = {
      'leave-days-warning': function(params) {
        console.log('params', params);
        const leaveDays = params.data.hrs;
        return leaveDays === '00:00:00';
      },
      'good-works': 'data.hrs > \'08:00:00\' '
    };
  }

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

  add() {
    const extras = Math.max(...this.rowData.map(data => data.id), 0).toString();
    console.log("maximum no", extras);
    
    this.router.navigateByUrl('/timesheet/add');
  }
}
