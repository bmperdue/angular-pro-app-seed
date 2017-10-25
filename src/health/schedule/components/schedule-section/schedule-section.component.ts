import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ScheduleItem } from '../../../shared/services/schedule/schedule.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'schedule-section',
  styleUrls: ['schedule-section.component.scss'],
  template: `
<div class ="schedule-section">

  <div class="schedule-section__bar">
    {{name}}
  </div>

  <div>
    <div class="schedule-section__item food" (click)="onSelect('meals', section.meals)" *ngIf="section.meals; else addMeal">
      <span>{{section.meals | join}}</span>
    </div>
    <ng-template #addMeal>
      <div class="schedule-section__item" (click)="onSelect('meals')">
        Assign meal
      </div>
    </ng-template>

    <div class="schedule-section__item workout" (click)="onSelect('workouts', section.meals)" *ngIf="section.meals; else addWorkout">
    <span>{{section.meals | join}}</span>
    </div>
    <ng-template #addWorkout>
      <div class="schedule-section__item" (click)="onSelect('workouts')">
        Assign workout
      </div>
    </ng-template>
  </div>

</div>
  `
})
export class ScheduleSectionComponent {
  @Input()
  name: string;

  @Input()
  section: ScheduleItem;

  @Output()
  select = new EventEmitter<any>()

  onSelect(type: string, assigned: string[] = []) {
    const data = this.section;
    this.select.emit({
      type,
      assigned,
      data
    });
  }
}
