import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEventType
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { ProgressBarService } from './progress-bar.service';

@Injectable()
export class ProgressBarInterceptor implements HttpInterceptor {
  constructor(private progressBar: ProgressBarService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    // Handle request
    request = this.addProgressHeader(request);

    // Handle response
    return next.handle(request).pipe(
      tap(event => {
        if (event.type === HttpEventType.ResponseHeader) {
          // if (!environment.production) {
          //   console.log(event);
          // }
        }
        if (
          event.type === HttpEventType.DownloadProgress ||
          event.type === HttpEventType.UploadProgress
        ) {
          const percentageDone = Math.round((100 * event.loaded) / event.total);
          this.progressBar.setPercentage(percentageDone);
        } else if (event.type === HttpEventType.Response) {
          // if (!environment.production) {
          //   const percentageDone = Math.random() * 100;
          //   this.progressBar.setPercentage(percentageDone);
          // }
          return event;
        }
      }),
      finalize(() => {
        setTimeout(() => {
          this.progressBar.resetPercentage();
        }, 500);
      })
    );
  }

  private addProgressHeader(request: HttpRequest<any>) {
    return request.clone({
      reportProgress: true
    });
  }
}
