import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'dz-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit, OnDestroy {
  @Input()
  content$: Observable<any>;

  @Input()
  isLoading$: Observable<boolean>;

  constructor() {}

  ngOnInit() {
    // this.content$.subscribe(res => console.log(res));
  }

  ngOnDestroy() {}
}
