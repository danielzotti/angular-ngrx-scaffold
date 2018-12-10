import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { LoggerService } from './logger.service';
import { ToastService } from '../modules/toast/toast.service';
import { TranslateService } from '../modules/translate/translate.service';

@Injectable()
export class ErrorService {
  constructor(
    private toastManager: ToastService,
    private translateService: TranslateService
  ) {} // private toastService: ToastService

  public log(resp: HttpErrorResponse, callback?) {
    if (resp.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      LoggerService.error('Client error', this.manageServerResponse(resp));
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      LoggerService.warning('Backend error', this.manageServerResponse(resp));
    }

    if (callback) {
      callback(resp);
    }
  }

  public toast(resp: HttpErrorResponse, callback?) {
    if (resp.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      this.toastManager.error(
        this.getServerMessage(resp),
        this.translateService.translate('Errore client', 'common.error_client')
      );
      LoggerService.error('Client error', resp);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      this.toastManager.error(
        this.getServerMessage(resp),
        this.translateService.translate('Errore server', 'common.error_backend')
      );
      LoggerService.error('Backend error', resp);
    }

    if (callback) {
      callback(resp);
    }
  }

  public toastWithMessage(resp: HttpErrorResponse, message: string) {
    if (resp.error instanceof Error) {
      this.toastManager.error(
        message,
        this.translateService.translate('Errore client', 'common.error_client')
      );
      LoggerService.error('Client error', resp);
    } else {
      this.toastManager.error(
        message,
        this.translateService.translate('Errore server', 'common.error_backend')
      );
      LoggerService.error('Error', resp);
    }
  }

  public custom(resp: HttpErrorResponse, customFunction) {
    if (customFunction) {
      customFunction(this.manageServerResponse(resp));
    }
  }

  public getServerMessage(text) {
    const value = this.manageServerResponse(text);
    const keyWithPrefix = 'server_response.' + value;

    if (this.translateService.hasTranslation(keyWithPrefix)) {
      return this.translateService.translate(value, keyWithPrefix);
    } else {
      return this.translateService.translate(value, null);
    }
  }

  public manageServerResponse(resp: IHttpError) {
    if (resp.error != null) {
      try {
        const json: IHttpErrorDetail =
          typeof resp.error === 'string' ? JSON.parse(resp.error) : resp.error;

        if (typeof json.message !== 'undefined' && json.message != null) {
          return json.message;
        }

        if (typeof json.error !== 'undefined' && json.error != null) {
          return json.error;
        }

        if (
          typeof json.error_description !== 'undefined' &&
          json.error_description != null
        ) {
          return json.error_description;
        }
      } catch (e) {
        console.log('[error.service]', e);
      }
    }
    if (resp.message != null) {
      return resp.message;
    }
    if (resp.statusText != null) {
      return resp.statusText;
    }

    return 'generic_error';
  }
}

interface IHttpError {
  error: string | IHttpErrorDetail;
  message: string;
  statusText: string;
}
interface IHttpErrorDetail {
  error?: string;
  error_description?: string;
  message?: string;
}
