import { Injectable } from '@angular/core';
import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';

@Injectable()
export class RouteService {
  public isChangingRoute = true;
  private previousUrl: string = null;

  constructor(private router: Router) {}

  public getPreviousUrl = () => {
    return this.previousUrl;
  };

  public setPreviousUrl = (url: string) => {
    this.previousUrl = url;
  };

  public navigationInterceptor = (event: RouterEvent): void => {
    if (event instanceof NavigationStart) {
      this.isChangingRoute = true;
    }
    if (event instanceof NavigationEnd) {
      this.isChangingRoute = false;
    }
    if (event instanceof NavigationCancel) {
      this.isChangingRoute = false;
    }
    if (event instanceof NavigationError) {
      this.isChangingRoute = false;
    }
  };
}
