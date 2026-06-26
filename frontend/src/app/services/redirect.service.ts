import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RedirectService {
  private redirectedToWelcome = false;

  constructor(private router: Router) {
    this.handleNavigationStart();
  }

  private handleNavigationStart(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart && event.navigationTrigger === 'imperative') {
        if (!this.redirectedToWelcome && this.router.url !== '/welcome') {
          this.redirectToWelcome();
        }
      }
    });
  }

  private redirectToWelcome(): void {
    this.redirectedToWelcome = true;
    this.router.navigateByUrl('/welcome');
  }
}
