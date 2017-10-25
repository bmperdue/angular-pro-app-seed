import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { Meal } from '../../../shared/services/meals/meals.service';
import { Workout } from '../../../shared/services/workouts/workouts.service';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'schedule-assign',
  styleUrls: ['schedule-assign.component.scss'],
  template: `
<div class="schedule-assign">
  <div class="schedule-assign__modal">
    <div class="schedule-assign__title">
      <img src="/img/{{section.type === 'workouts' ? 'workout': 'food'}}.svg">
      <h1>Assign {{section.type}}</h1>
      <a class="btn__add" [routerLink]="getRoute(section.type)">
        <img src="/img/add-white.svg">
        New {{section.type}}
      </a>
    </div>

    <div class="achedule-assign__list">
      <span class="schedule-assign__empty" *ngIf="!list?.length">
      <img src="/img/face.svg" alt="">
        Nothing here to assign
      </span>
        <div *ngFor="let item of list" [class.active]="exists(item.name)" (click)="toggleItem(item.name)" >
          {{item.name}}
        </div>
      </div>
    </div>

    <div class="schedule-assign__submit">
      <div>
      <button type="button" class="button" (click)="updateAssign()">Update</button>
      <button type="button" class="button" (click)="cancelAssign()">Assign</button>
      </div>
    </div>

  </div>
  `
})
export class ScheduleAssignComponent implements OnInit {

  private selected: string[] = [];

  @Input()
  section: any;

  @Input()
  list: Meal[] | Workout[];

  @Output()
  update = new EventEmitter<any>();

  @Output()
  cancel = new EventEmitter<any>();

  ngOnInit() {
    this.selected = [...this.section.assigned];
  }

  toggleItem(name: string) {
    if (this.exists) {
      this.selected = this.selected.filter(item => item !== name);
    } else {
      this.selected = [...this.selected, name]
    }
  }

  getRoute(name: string) {
    return [`../${name}/new`]
  }

  exists(name: string) {
    return !!~this.selected.indexOf(name);
  }

  updateAssign() {
    this.update.emit({ [this.section.type]: this.selected })
  }

  cancelAssign() {
    this.cancel.emit();
  }




}
