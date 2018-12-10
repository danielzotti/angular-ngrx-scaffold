import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable()
export class LoaderService {
  public isLoading: Subject<boolean>;
  public isLoading$: Observable<boolean>;

  private _isLoading: boolean = false;

  constructor() {
    this.isLoading = new Subject<boolean>();
    this.isLoading$ = this.isLoading.asObservable();
  }

  public setIsLoading = (l: boolean) => {
    this._isLoading = l;
    this.isLoading.next(this._isLoading);
  };
}
