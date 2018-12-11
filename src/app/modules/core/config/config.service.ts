import { Injectable } from '@angular/core';

import { environment } from '../../../../environments/environment';

@Injectable()
export class ConfigService {
  constructor() {
    if (typeof environment === 'undefined' || environment == null) {
      // TODO Avvisare con un errore / email?
      alert('Errore nella configurazione della variabile environmente!');
    } else {
      if (!environment.production) {
        console.log('CONFIG', {
          api: {
            domain: ConfigService.API_DOMAIN,
            'domain URL': ConfigService.API_DOMAIN_URL,
            base: ConfigService.API_BASE,
            'base URL': ConfigService.API_BASE_URL,
            'base href': ConfigService.BASE_HREF
          }
        });
      }
    }
  }

  public static USE_FAKE_API: boolean = environment.useFakeApi;
  public static API_DOMAIN: string = environment.apiDomain;
  public static API_DOMAIN_URL: string =
    window.location.protocol + '//' + ConfigService.API_DOMAIN;
  public static API_BASE: string = environment.apiBaseUrl;
  public static API_BASE_URL: string =
    ConfigService.API_DOMAIN_URL + environment.apiBaseUrl;
  public static LOGIN_URL: string = environment.loginUrl;
  public static MAX_REQUEST_LENGTH: number =
    environment.maxRequestLength * 1024 * 1024;
  public static DATE_DEFAULT_FORMAT: string = environment.defaultDateFormat;
  public static DATETIME_DEFAULT_FORMAT: string =
    environment.defaultDateTimeFormat;
  public static DATE_DEFAULT_PATTERN: string = environment.defaultDatePattern;
  public static ANGULAR_DATE_DEFAULT_FORMAT: string =
    environment.angularDefaultDateFormat;
  public static ANGULAR_DATETIME_DEFAULT_FORMAT: string =
    environment.angularDefaultDateTimeFormat;
  public static BASE_HREF: string = environment.baseHref;
  public static PAGE_SIZE_DEFAULT: number = environment.pageSizeDefault;
  public static APP_NAME: string = environment.appName;
}
