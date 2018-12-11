import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from 'src/app/modules/core/config/config.service';
import { IEntityDb } from '../shared/models/db/entity.db.models';
import { IEntitySelectListItem } from '../components/entity/select-list/entity-select-list.models';
import { of } from 'rxjs';

@Injectable()
export class EntityService {
  public static apiBaseUrl = '/entity-url';
  public static apiUrl: string =
    ConfigService.API_BASE_URL + EntityService.apiBaseUrl;

  // FAKE API
  public static fakeApiUrl: string =
    ConfigService.API_DOMAIN_URL + '/assets/fake-data';

  constructor(private http: HttpClient, private config: ConfigService) {}

  // ENTITY
  create(entity) {
    if (ConfigService.USE_FAKE_API) {
      return of({ ...entity, id: 4 });
    }
    return this.http.post<IEntityDb>(EntityService.apiUrl, entity);
  }

  update(entity) {
    if (ConfigService.USE_FAKE_API) {
      return of(entity);
    }
    return this.http.put<IEntityDb>(EntityService.apiUrl, entity);
  }

  delete(entityId) {
    if (ConfigService.USE_FAKE_API) {
      if (entityId) {
        return this.http.get<IEntityDb>(
          `${EntityService.fakeApiUrl}/entity${entityId}-deleted.json`
        );
      }
    }
    return this.http.delete<IEntityDb>(`${EntityService.apiUrl}/${entityId}`);
  }

  undelete(entityId) {
    if (ConfigService.USE_FAKE_API) {
      if (entityId) {
        return this.http.get<IEntityDb>(
          `${EntityService.fakeApiUrl}/entity${entityId}-undeleted.json`
        );
      }
      return of(null);
    }
    return this.http.put<IEntityDb>(
      `${EntityService.apiUrl}/${entityId}/undelete`,
      null
    );
  }

  getById(entityId: number) {
    if (ConfigService.USE_FAKE_API) {
      if (entityId) {
        return this.http.get<IEntityDb>(
          `${EntityService.fakeApiUrl}/entity${entityId}.json`
        );
      }
      return of(null);
    }
    return this.http.get<IEntityDb>(`${EntityService.apiUrl}/${entityId}`);
  }

  // LIST
  getAll() {
    if (ConfigService.USE_FAKE_API) {
      return this.http.get<Array<IEntityDb>>(
        `${EntityService.fakeApiUrl}/entities.json`
      );
    }
    return this.http.get<Array<IEntityDb>>(EntityService.apiUrl);
  }

  // SELECT LIST
  getSelectList() {
    if (ConfigService.USE_FAKE_API) {
      return this.http.get<Array<IEntitySelectListItem>>(
        `${EntityService.fakeApiUrl}/entities.json`
      );
    }
    return this.http.get<Array<IEntitySelectListItem>>(EntityService.apiUrl);
  }
}
