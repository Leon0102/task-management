import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { SpinnerService } from '../shared/services/spinner.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private spinnerService: SpinnerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinnerService.requestStarted();
    return this.handler(next, req);
  }

  handler(next: HttpHandler, req: HttpRequest<any>) {
    return next.handle(req).pipe(
      finalize(() => {
        this.spinnerService.requestEnded();
      }
      ));
  }
}
