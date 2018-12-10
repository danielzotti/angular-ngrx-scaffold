import { Component, Input, EventEmitter, Output } from '@angular/core';
import { IEntityDetail } from './entity-detail.models';

@Component({
  selector: 'dz-entity-detail',
  templateUrl: './entity-detail.component.html',
  styleUrls: ['./entity-detail.component.scss']
})
export class EntityDetailComponent {
  @Input()
  entity: IEntityDetail;

  @Input()
  showEditButtons = false;

  @Output()
  openEdit: EventEmitter<IEntityDetail> = new EventEmitter<IEntityDetail>();

  constructor() {}

  onEdit() {
    this.openEdit.emit({ ...this.entity });
  }
}
