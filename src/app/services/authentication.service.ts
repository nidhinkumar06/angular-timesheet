import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { User, Role } from '../models';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private dbPath = '/1kNv5h2r6YvcoDpEFIn_yxiVyHcWZd0J2hWc96xhEvWA/users';

  constructor(private http: HttpClient, private firebaseAuth: AngularFireAuth, private db: AngularFireDatabase) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password).then((response: any) => {
      const user: any = {
        uid: response.user.uid
      };
      if (response) {
        const rmDotEmail = email.replace('.', '_dot_');
        this.db.database.ref(this.dbPath).child(rmDotEmail).once('value').then((snapshot: any) => {
          const val = snapshot.val();
          if (val) {
            user.role = val.role;
            user.name = val.name;
            user.emailId = response.user.email;
          } else {
            user.role = Role.Admin;
            user.name = 'Admin';
            user.emailId = response.user.email;
          }
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        });
      }
      return user;
    }).catch((error: string) => {
      console.log('error is', error);
    });
  }

  createUser(email: string, password: string) {
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    // remove user from local storage to log user out
    this.firebaseAuth.auth.signOut();
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
