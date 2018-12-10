import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import { IEntitySelectListItem } from './entity-select-list.models';

@Component({
  selector: 'dz-entity-select-list',
  templateUrl: './entity-select-list.component.html',
  styleUrls: ['./entity-select-list.component.scss']
})
export class EntitySelectListComponent implements OnInit, AfterViewInit {
  @Input()
  entities: Array<IEntitySelectListItem>;

  @Output()
  entitySelected: EventEmitter<IEntitySelectListItem> = new EventEmitter<
    IEntitySelectListItem
  >();

  @ViewChild('filter')
  filter: ElementRef<HTMLInputElement>;

  searchText: string;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    // TODO: migliorare il focus automatico
    if (this.filter && this.filter.nativeElement) {
      setTimeout(() => {
        this.filter.nativeElement.focus();
      }, 0);
    }
  }

  onSelect(entity: IEntitySelectListItem) {
    this.entitySelected.emit(entity);
  }
}
