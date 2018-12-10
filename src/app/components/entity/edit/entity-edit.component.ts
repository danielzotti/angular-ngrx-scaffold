import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { IEntityEdit } from './entity-edit.models';
import { NgForm } from '@angular/forms';
import { FormService } from 'src/app/modules/core/services/form.service';
import { TranslateService } from 'src/app/modules/core/modules/translate/translate.service';

@Component({
  selector: 'dz-entity-edit',
  templateUrl: './entity-edit.component.html',
  styleUrls: ['./entity-edit.component.scss']
})
export class EntityEditComponent implements OnInit, OnChanges {
  @Input()
  entity: IEntityEdit;

  @Output()
  edited: EventEmitter<IEntityEdit> = new EventEmitter<IEntityEdit>();

  @Output()
  deleted: EventEmitter<IEntityEdit> = new EventEmitter<IEntityEdit>();

  @Output()
  undeleted: EventEmitter<IEntityEdit> = new EventEmitter<IEntityEdit>();

  @ViewChild('form')
  form: NgForm;

  editingModel: IEntityEdit;

  constructor(
    private formService: FormService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.editingModel = this.entity;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.editingModel = this.entity;
    if (
      changes.entity &&
      changes.entity.currentValue &&
      changes.entity.currentValue.isDone === true
    ) {
      this.reset();
    }
  }

  reset() {
    if (this.form) {
      this.form.reset(this.entity);
    } else {
      this.editingModel = this.entity;
    }
  }

  delete() {
    const isConfirmed = confirm(
      this.translateService.translate(
        'Sei sicuro di voler eliminare questa entità?',
        'components.entity_edit.confirm_delete_message'
      )
    );
    if (!isConfirmed) {
      return;
    }
    this.deleted.emit({ ...this.entity });
  }

  undelete() {
    this.undeleted.emit({ ...this.entity });
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.formService.markAsTouchedAndDirtyAllControls(form);
      return;
    }
    const editedEntity = form.value as IEntityEdit;

    this.edited.emit({
      ...this.editingModel,
      ...editedEntity
    });
  }
}
