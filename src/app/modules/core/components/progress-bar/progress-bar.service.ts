import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable()
export class ProgressBarService {
  public percentage: Subject<number>;
  public percentage$: Observable<number>;

  private _percentage = 0;

  constructor() {
    this.percentage = new Subject<number>();
    this.percentage$ = this.percentage.asObservable();
  }

  public getPercentage(): number {
    return this._percentage;
  }

  public setPercentage(p: number) {
    this._percentage = p;
    this.percentage.next(this._percentage);
  }

  public resetPercentage() {
    this._percentage = 0;
    this.percentage.next(this._percentage);
  }
}
