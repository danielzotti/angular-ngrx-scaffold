import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from 'src/app/modules/core/config/config.service';
import { IEntityDb } from '../shared/models/db/entity.db.models';
import { IEntitySelectListItem } from '../components/entity/select-list/entity-select-list.models';

@Injectable()
export class EntityService {
  public static apiBaseUrl = '/entity-url';
  public static apiUrl: string =
    ConfigService.API_BASE_URL + EntityService.apiBaseUrl;

  constructor(private http: HttpClient, private config: ConfigService) {}

  // ENTITY
  create(entityParam) {
    return this.http.post<IEntityDb>(EntityService.apiUrl, entityParam);
  }

  update(entityParam) {
    return this.http.put<IEntityDb>(EntityService.apiUrl, entityParam);
  }

  delete(entityParamId) {
    return this.http.delete<IEntityDb>(
      `${EntityService.apiUrl}/${entityParamId}`
    );
  }

  undelete(entityParamId) {
    return this.http.put<IEntityDb>(
      `${EntityService.apiUrl}/${entityParamId}/undelete`,
      null
    );
  }

  getById(entityParamId: number) {
    return this.http.get<IEntityDb>(`${EntityService.apiUrl}/${entityParamId}`);
  }

  // LIST
  getAll() {
    return this.http.post<Array<IEntityDb>>(
      `${EntityService.apiUrl}/filter`,
      null
    );
  }

  // SELECT LIST
  getSelectList() {
    return this.http.get<Array<IEntitySelectListItem>>(EntityService.apiUrl);
  }
}
