import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'list-item',
  styleUrls: ['list-item.component.scss'],
  template: `
<div class="list-item">
  <a [routerLink]="getRoute(item)">
    <p class="list-item__name">{{item.name}}</p>
    <p class="list-item__ingredients"><span>{{item.ingredients}}</span></p>
  </a>

  <div *ngIf="toggled" class="list-item__delete" >
    <p>Delete item?</p>
    <button class="confirm" type="confirm" (click)="removeItem()">Yes</button>
    <button class="confirm" type="cancel" (click)="toggle()">No</button>
  </div>

  <button class="trash" type="button" (click)="toggle()"><img src="/img/remove.svg"></button>

</div>
  `
})
export class ListItemComponent {

  toggled = false;

  @Input()
  item: any;

  @Output()
  remove: any = new EventEmitter<any>()

  constructor() { }

  getRoute(item: any) {
    return [`../meals`, item.$key]
  }

  removeItem() {
    this.remove.emit(this.item);
  }

  toggle() {
    this.toggled = !this.toggled;
  }
}
