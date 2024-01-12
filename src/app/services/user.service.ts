import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Auth,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  user,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { signOut } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: Observable<any> = this.auth.authState;

  constructor(private router: Router, private auth: AngularFireAuth) {}

  public register(email: string, password: string): boolean {
    let result: boolean = false;
    this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['/login']);
        result = true;
      })
      .catch();

    return result;
  }

  public login(email: string, password: string): boolean {
    let result: boolean = false;
    this.auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['/']);
        result = true;
      })
      .catch();

    return result;
  }

  public logout(): void {
    this.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }
}
