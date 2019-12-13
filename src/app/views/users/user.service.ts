import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { User } from './user.model';
import { AuthenticationService } from '../../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private dbPath = '/1kNv5h2r6YvcoDpEFIn_yxiVyHcWZd0J2hWc96xhEvWA/users';

  timesheetRef: AngularFireList<User> = null;

  constructor(private db: AngularFireDatabase, private authService: AuthenticationService) {
    this.timesheetRef = db.list(this.dbPath);
  }

   addUser(userData: User): void {
     const key = userData.email.replace('.', '_dot_');
     this.timesheetRef.update(key, userData).then((response) => {
       console.log('user push response is', response);
       const password = '1234567';
       this.authService.createUser(userData.email, password);
     });
   }

   getUserByEmail(email: string): AngularFireList<void> {
    return this.db.list(this.dbPath, ref => ref.orderByChild('email').equalTo(email));
   }

   getAllUsers(): AngularFireList<User> {
     return this.timesheetRef;
   }
}
