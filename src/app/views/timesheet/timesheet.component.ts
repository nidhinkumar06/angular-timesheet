import { TimeSheetService } from './timesheet.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { Data } from '../../app.storage';
import { Router } from '@angular/router';
import { MdcDialog, MdcDialogRef, MDC_DIALOG_DATA } from '@angular-mdc/web';
import { DialogAlertComponent } from '../alert/dialog-alert';


@Component({
  templateUrl: 'timesheet.component.html'
})
export class TimeSheetComponent implements OnInit {

  rowClassRules;
  gridApi;
  selectedRows;
  rowSelection;
  canshowEdit = false;
  canshowDelete = false;

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

  constructor(
    private timesheetService: TimeSheetService,
    private router: Router,
    private data: Data,
    private dialog: MdcDialog
  ) {
    this.rowSelection = 'multiple';
    this.rowClassRules = {
      'leave-days-warning': function (params) {
        const leaveDays = params.data.hrs;
        return leaveDays === '00:00:00';
      },
      'good-works': 'data.hrs > \'08:00:00\' '
    };
  }

  ngOnInit() {}

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

  onSelectionChanged() {
    this.selectedRows = this.gridApi.getSelectedRows();
    if (this.selectedRows.length === 0) {
      this.canshowEdit = false;
      this.canshowDelete = false;
    }
    if (this.selectedRows.length > 0) {
      this.canshowEdit = true;
      this.canshowDelete = true;
    }

    if (this.selectedRows.length > 1) {
      this.canshowEdit = false;
      this.canshowDelete = true;
    }
  }

  onGridReady(params): void {
    this.gridApi = params.api;
    this.getTimeSheetList();
  }

  add(): void {
    const extras = Math.max(...this.rowData.map(data => data.id), 0);
    // this.router.navigateByUrl('/timesheet/add');
    this.router.navigate(['/timesheet/add', extras]);
  }

  gotoEdit(): void {
    const id = this.selectedRows[0].id;
    this.data.storage = this.selectedRows[0];
    this.router.navigate(['/timesheet/edit', id]);
  }

  gotoDelete(): void {
    const dialogRef = this.dialog.open(DialogAlertComponent, {
      escapeToClose: false,
      clickOutsideToClose: false,
      buttonsStacked: false,
      id: 'my-dialog',
      data: { title: `Are you sure want to delete ${this.selectedRows.length} record(s)`, noBtn: 'No', yesBtn: 'Yes' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'accept') {
        this.canshowDelete = false;
        this.canshowEdit = false;
        if (this.selectedRows.length !== this.rowData.length) {
          this.selectedRows.map((row: any) => {
            const id = (row.id).toString();
            this.timesheetService.deleteTimeSheet(id);
          });
        } else {
          this.timesheetService.deleteAll();
          this.rowData = [];
        }
      }
    });
  }
}
