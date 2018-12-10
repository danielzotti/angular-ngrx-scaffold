import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IEntityDb } from 'src/app/shared/models/db/entity.db.models';
import { EntityFacade } from 'src/app/facades/entity.facade';
import { IEntityEdit } from 'src/app/components/entity/edit/entity-edit.models';

@Component({
  selector: 'dz-entity-detail-page',
  templateUrl: './entity-detail.page.html',
  styleUrls: ['./entity-detail.page.scss']
})
export class EntityDetailPage implements OnInit, OnDestroy {
  // UI
  isEntityEditModalOpen;

  // Entity Detail
  isEntityFetching$: Observable<boolean> = this.facade.isFetching$;
  entityId: number = null;
  entity$: Observable<IEntityDb>;
  entity: IEntityDb;

  // Entity Edit
  editModel$: Observable<Partial<IEntityEdit>> = this.facade.editModel$;

  constructor(
    private route: ActivatedRoute,
    private facade: EntityFacade,
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.entityId = +params['entityId'];
      // Load dell'entità
      this.facade.loadById(this.entityId);
      this.entity$ = this.facade.getById(this.entityId);
      this.entity$.subscribe(e => (this.entity = e));
    });

    // ENTITY EDIT MODAL
    this.editModel$.subscribe(editModel => {
      if (editModel && editModel.isDone !== true) {
        this.isEntityEditModalOpen = true;
      } else {
        this.isEntityEditModalOpen = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.facade.cancelLoadById();
  }

  // ENTITY
  onOpenEdit(entity: IEntityEdit = this.entity) {
    this.facade.setEditModel(entity);
  }
  onCloseEdit() {
    this.facade.unsetEditModel();
  }
  onEntityEdited(entity: IEntityEdit) {
    this.facade.update(entity);
  }
  onEntityDeleted(entity: IEntityEdit) {
    this.facade.delete(entity);
  }
  onEntityUndeleted(entity: IEntityEdit) {
    this.facade.undelete(entity);
  }
}
