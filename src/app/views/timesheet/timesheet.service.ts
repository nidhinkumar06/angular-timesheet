import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { TimeSheet } from './timesheet.model';

@Injectable({
  providedIn: 'root'
})
export class TimeSheetService {

  private dbPath = '/1kNv5h2r6YvcoDpEFIn_yxiVyHcWZd0J2hWc96xhEvWA/Sheet1';

  timesheetRef: AngularFireList<TimeSheet> = null;

  constructor(private db: AngularFireDatabase) {
    this.timesheetRef = db.list(this.dbPath);
    console.log('db list0', db.list(this.dbPath));
  }

   addTimeSheet(timeSheetData: TimeSheet): void {
     this.timesheetRef.push(timeSheetData);
   }

//   createCustomer(customer: TimeSheet): void {
//     this.timesheetRef.push(customer);
//   }

//   updateCustomer(key: string, value: any): Promise<void> {
//     return this.timesheetRef.update(key, value);
//   }

//   deleteCustomer(key: string): Promise<void> {
//     return this.timesheetRef.remove(key);
//   }

  getTimeSheetList(): AngularFireList<TimeSheet> {
    return this.timesheetRef;
  }

//   deleteAll(): Promise<void> {
//     return this.timesheetRef.remove();
//   }
}
