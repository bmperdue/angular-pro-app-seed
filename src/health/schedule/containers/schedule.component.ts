import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Store } from 'store';
import { ScheduleService,ScheduleItem } from '../../shared/services/schedule/schedule.service';
import { Meal, MealsService } from '../../shared/services/meals/meals.service';
import { Workout, WorkoutsService } from '../../shared/services/workouts/workouts.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'schedule',
  styleUrls: ['schedule.component.scss'],
  template: `
<div class="schedule">
  <schedule-calendar (select)="changeSection($event)" [items]="schedule$ | async" [date]="date$ | async" (change)="changeDate($event)">
  </schedule-calendar>
  <schedule-assign (update)="assignItem($event)" (cancel)="closeAssign()" *ngIf="open" [section]="selected$ | async" [list]="list$ | async"></schedule-assign>


</div>
`
})
export class ScheduleComponent implements OnInit, OnDestroy {

  open = false;

  date$: Observable<Date>;
  subscriptions: Subscription[];
  selected$: Observable<any>;
  list$: Observable<Meal[] | Workout[]>;
  schedule$: Observable<ScheduleItem[]>;

  constructor(private store: Store, private scheduleService: ScheduleService, private mealsService: MealsService, private workoutService: WorkoutsService) { }

  changeDate(date: Date) {
    this.scheduleService.updateDate(date);
  }

  changeSection(event: any) {
    this.open = true;
    this.scheduleService.selectSection(event);
  }

  ngOnInit() {
    this.date$ = this.store.select('date');
    this.schedule$ = this.store.select('schedule');
    this.selected$ = this.store.select('selected');
    this.list$ = this.store.select('list');

    this.subscriptions = [
      this.scheduleService.schedule$.subscribe(),
      this.scheduleService.selected$.subscribe(),
      this.scheduleService.list$.subscribe(),
      this.scheduleService.items$.subscribe(),
      this.mealsService.meals$.subscribe(),
      this.workoutService.workouts$.subscribe(),
    ]
  }
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());

  }

  asignItem(items: string[]) {
    this.scheduleService.updateItems(items);
    this.closeAssign();
  }

  closeAssign(){
    this.open = false;
  }

}
