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
import { NgForm } from '@angular/forms';
import { FormService } from 'src/app/modules/core/services/form.service';
import { IEntityCreate } from './entity-create.models';

@Component({
  selector: 'dz-entity-create',
  templateUrl: './entity-create.component.html',
  styleUrls: ['./entity-create.component.scss']
})
export class EntityCreateComponent implements OnInit, OnChanges {
  @Input()
  entity: IEntityCreate;

  @Output()
  created: EventEmitter<IEntityCreate> = new EventEmitter<IEntityCreate>();

  @ViewChild('form')
  form: NgForm;

  createModel: IEntityCreate;

  constructor(private formService: FormService) {}

  ngOnInit() {
    this.createModel = this.entity
      ? this.entity
      : { id: null, name: null, isDeleted: false };
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.createModel = this.entity;
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
      this.form.reset();
    } else {
      this.createModel = this.entity;
    }
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.formService.markAsTouchedAndDirtyAllControls(form);
      return;
    }
    const createdEntity = form.value as IEntityCreate;

    this.created.emit({
      ...this.createModel,
      ...createdEntity
    });
  }
}
