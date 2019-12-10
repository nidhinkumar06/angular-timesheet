import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';


import { GridHttpService } from './aggrid-http.service';

@Component({
  templateUrl: './aggrid-http.component.html',
})
export class AggridHttpComponent {

  public gridApi;
  public gridColumnApi;
  public modules: any[] = AllModules;

  public columnDefs;
  public autoGroupColumnDef;
  public defaultColDef;
  public rowSelection;
  public rowGroupPanelShow;
  public pivotPanelShow;
  public paginationPageSize;
  public paginationNumberFormatter;
  public sideBar;
  
  public rowData: [];

  constructor(private http: HttpClient, private gridHttpService: GridHttpService) {
    this.columnDefs = [
      {
        headerName: 'Athlete',
        field: 'athlete',
        width: 150,
        checkboxSelection: function(params) {
          return params.columnApi.getRowGroupColumns().length === 0;
        },
        headerCheckboxSelection: function(params) {
          return params.columnApi.getRowGroupColumns().length === 0;
        }
      },
      {
        headerName: 'Age',
        field: 'age',
        width: 90
      },
      {
        headerName: 'Country',
        field: 'country',
        width: 120
      },
      {
        headerName: 'Year',
        field: 'year',
        width: 90
      },
      {
        headerName: 'Date',
        field: 'date',
        width: 110
      },
      {
        headerName: 'Sport',
        field: 'sport',
        width: 110
      },
      {
        headerName: 'Gold',
        field: 'gold',
        width: 100
      },
      {
        headerName: 'Silver',
        field: 'silver',
        width: 100
      },
      {
        headerName: 'Bronze',
        field: 'bronze',
        width: 100
      },
      {
        headerName: 'Total',
        field: 'total',
        width: 100
      }
    ];
    this.autoGroupColumnDef = {
      headerName: 'Group',
      width: 200,
      field: 'athlete',
      valueGetter: function(params) {
        if (params.node.group) {
          return params.node.key;
        } else {
          return params.data[params.colDef.field];
        }
      },
      headerCheckboxSelection: true,
      cellRenderer: 'agGroupCellRenderer',
      cellRendererParams: { checkbox: true }
    };
    this.defaultColDef = {
      editable: true,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      sortable: true,
      resizable: true,
      filter: true
    };
    this.sideBar = 'columns';
    this.rowSelection = 'multiple';
    this.rowGroupPanelShow = 'always';
    this.pivotPanelShow = 'always';
    this.paginationPageSize = 10;
    this.paginationNumberFormatter = function(params) {
      return '[' + params.value.toLocaleString() + ']';
    };

  }

  onPageSizeChanged(newPageSize) {
    const value = document.getElementById('page-size')['value'];
    this.gridApi.paginationSetPageSize(Number(value));
  }

  onGridReady(params): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridHttpService.getOlympicData().subscribe(
      data => {
        this.rowData = data;
      }
    );
  }
}
