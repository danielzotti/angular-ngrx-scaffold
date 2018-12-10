import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';

import { EntityFacade } from 'src/app/facades/entity.facade';
import { IEntityDb } from 'src/app/shared/models/db/entity.db.models';
import { IEntityCreate } from 'src/app/components/entity/create/entity-create.models';
import { IEntitySelectListItem } from 'src/app/components/entity/select-list/entity-select-list.models';

@Component({
  selector: 'dz-entity-list-page',
  templateUrl: './entity-list.page.html',
  styleUrls: ['./entity-list.page.scss']
})
export class EntityListPage implements OnInit, OnDestroy {
  // List
  entities$: Observable<Array<IEntitySelectListItem>> = this.facade.list$;
  isLoading$: Observable<boolean> = this.facade.isFetching$;

  // Create
  createModel$: Observable<Partial<IEntityCreate>> = this.facade.createModel$;

  constructor(
    private router: Router,
    private facade: EntityFacade,
  ) {}

  ngOnInit() {
    this.facade.loadAll();
  }

  ngOnDestroy(): void {
    this.facade.cancelLoadAll();
  }

  onEntitySelected(entity: IEntityDb) {
    this.router.navigateByUrl(`/entities/${entity.id}`);
  }

  onEntityCreated(entity: IEntityCreate) {
    this.facade.create(entity);
  }
}
