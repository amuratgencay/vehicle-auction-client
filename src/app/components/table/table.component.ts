import { Component, OnInit, Input, OnChanges, SimpleChanges, ComponentFactoryResolver, ViewChildren, ComponentRef, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {
  @Input() columns: [TableColumn];
  @Input() actions: [RowAction];
  @Input() data: any[];
  @Input() striped: boolean;
  @Output() rowActionClicked: EventEmitter<{ action: RowAction, row: any }> = new EventEmitter();
  order: { key?: string, reverse?: boolean } = {};
  sayfalama: { itemsPerPage?: number, currentPage?: number, totalItems?: number } = { itemsPerPage: 9, currentPage: 1 };
  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private router: Router) { }

  ngOnInit() {
    this.sayfalama.totalItems = this.data ? this.data.length : 0;
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.sayfalama.totalItems = this.data ? this.data.length : 0;
  }
  siralamaDegistir(key) {
    if (this.order.key === key) {
      this.order.reverse = !this.order.reverse;
    } else {
      this.order.reverse = false;
    }
    this.order.key = key;
  }
  getComponent(component) {
    const factory = this.componentFactoryResolver.resolveComponentFactory(component);
  }
  cellClick(detailLink) {
    this.router.navigate(detailLink);
  }
}
export interface ITableComponent {
  init(row);
}

export class RowAction {
  show(row: any): boolean {
    return true;
  }
  constructor(public key: string, public text: string = null, public tooltip: string = null, public icon: string = null, public svgIcon: string = null) {
  }
}
export interface TableColumn {
  field: string;
  title: string;
  cellClass?: string;
  format?: string;
  component?: ITableComponent;
  type?: 'number' | 'currency' | 'date' | 'component';
}
