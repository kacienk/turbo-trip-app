import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Auth } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, take } from 'rxjs';
import { flush } from '@angular/core/testing';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AngularFireAuth);
  const router = inject(Router);
  let userLoggedIn;

  auth.authState.pipe(
    take(1),
    map((user) => {
      userLoggedIn = user ? true : false;
    })
  );

  if (!userLoggedIn) return router.createUrlTree(['/', 'login']);

  return userLoggedIn;
};
