import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {

  columnDefs = [
    {
      headerName: 'S.No',
      field: 'id',
      sortable: true,
      filter: true,
      width: 100
    },
    { headerName: 'Name', field: 'Name', sortable: true, filter: true, resizable: true },
    { headerName: 'Mobile No', field: 'MobileNo', sortable: true, filter: true, resizable: true },
    { headerName: 'Email', field: 'Email', sortable: true, filter: true, resizable: true },
    { headerName: 'Address', field: 'Address', sortable: true, filter: true, resizable: true },
    { headerName: 'City', field: 'City', sortable: true, filter: true, resizable: true }
  ];

  rowData = [];

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
  }

  onGridReady(): void {
    this.getUsersList();
  }

  getUsersList() {
    this.userService.getAllUsers().snapshotChanges().pipe(
      map(changes =>
        changes.map((c: any, index: number) => {
          console.log('c is', c);
          return (
            {
              id: index + 1,
              Name: c.payload.val().name,
              MobileNo: c.payload.val().mobileno,
              Email: c.payload.val().email,
              City: c.payload.val().city,
              Address: c.payload.val().address,
            }
          );
        }
        )
      )
    ).subscribe(datas => {
      this.rowData = datas;

    });
  }

  add(): void {
    this.router.navigate(['/users/add']);
  }

}
