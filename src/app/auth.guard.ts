import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
// 4f4f13ffbbfe4afca991435a42893a88

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(): boolean {
    const token = localStorage.getItem('apiToken');
    if (token) {
      return true;
    } else {
      this.router.navigate(['/set-token']);
      return false;
    }
  }
}