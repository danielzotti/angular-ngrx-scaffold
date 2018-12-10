import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ITranslation, ICurrentLanguage } from './translate.model';
import { TranslatePipe } from './translate.pipe';

import * as moment from 'moment/moment';
import { ConfigService } from '../../config/config.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class TranslateService {
  constructor(private http: HttpClient) {}

  public URL =
    window.location.origin + ConfigService.BASE_HREF + '/assets/translations/';
  public DEFAULT = 'it';
  public TRANSLATION = 'translation';
  public CURRENT_LANGUAGE = 'currentLanguage';

  public getValue(key: string) {
    if (typeof key !== 'string' || key == null) {
      return null;
    }

    const translationDb = localStorage.getItem(this.TRANSLATION);

    if (translationDb == null) {
      return null;
    }

    let translationModel = null;

    try {
      translationModel = JSON.parse(translationDb);
    } catch (ex) {
      console.log('[translate.service]', ex);
    }

    if (translationModel == null) {
      return null;
    }

    const text = key.split('.').reduce((o, i) => {
      return typeof o !== 'undefined' && o != null ? o[i] : null;
    }, translationModel); // typeof o != "undefined" ?

    return text ? text : null;
  }

  public hasTranslation(key) {
    return this.getValue(key) != null ? true : false;
  }

  public translate(defaultValue: string, key: string) {
    const translation = this.getValue(key);
    if (translation != null) {
      return translation;
    }
    return defaultValue;
  }

  public set(translationId: string) {
    this.http.get(this.URL + translationId + '.json').subscribe(
      (newTranslation: ITranslation) => {
        this.saveTranslation(newTranslation);
      },
      null,
      () => {
        window.location.reload();
      } // trovare un'alternativa al refresh della pagine per aggiornare le traduzioni
    );
  }

  public getId(): string {
    const currentLanguage: string = localStorage.getItem(this.CURRENT_LANGUAGE);

    if (currentLanguage != null) {
      try {
        const language = JSON.parse(currentLanguage) as ICurrentLanguage;
        return typeof language.translationId === 'string'
          ? language.translationId
          : null;
      } catch (e) {
        console.log('[translate.service]', e);
      }
    }

    return null;
  }

  public load = (translationId: string = this.DEFAULT) => {
    return new Promise((resolve, reject) => {
      this.http.get(this.URL + translationId + '.json').subscribe(
        (newTranslation: ITranslation) => {
          this.saveTranslation(newTranslation);
          moment.locale(translationId);
          resolve(true);
        },
        res => {
          !environment.production
            ? alert('Problema con il file di traduzione')
            : console.error('Problema con il file di traduzione', res);
          resolve(true);
        }
      );
    });
  }

  private saveTranslation = (newTranslation: ITranslation) => {
    const newCurrentLanguage: ICurrentLanguage = {
      translationId: newTranslation.id,
      translationVersion: newTranslation.version
    };

    localStorage.setItem(this.TRANSLATION, JSON.stringify(newTranslation));
    localStorage.setItem(
      this.CURRENT_LANGUAGE,
      JSON.stringify(newCurrentLanguage)
    );
  }
}
