import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Auth } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, take } from 'rxjs';
import { flush } from '@angular/core/testing';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  return userService.user$.pipe(
    take(1),
    map((user) => {
      const userLoggedIn = !!user;

      if (!userLoggedIn) return router.createUrlTree(['/', 'login']);

      return userLoggedIn;
    })
  );
};
