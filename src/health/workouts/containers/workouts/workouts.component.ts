import { Component } from '@angular/core';

import { WorkoutsService,Workout } from '../../../shared/services/workouts/workouts.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Store } from 'store';

@Component({
  selector: 'workouts',
  styleUrls: ['workouts.component.scss'],
  template: `
<div class="workouts">
  <div class="workouts__title">
    <h1>
      <img src="/img/food.svg">
      Your workouts
    </h1>
    <a class="btn__add" [routerLink]="['../workouts/new']"><img src="/img/add-white.svg">New Workout</a>
    </div>
    <div *ngIf="workouts$ | async as workouts; else loading">
      <div class="message" *ngIf="!workouts.length">
        <img src="/img/face.svg">
        No workouts, add a new workout to start
      </div>
      <list-item (remove)="removeWorkout($event)" *ngFor="let workout of workouts" [item]="workout"></list-item>
    </div>
    <ng-template #loading>
    <div class="message">
      <img src="/img/loading.svg">
      Fetching workouts...
    </div>
  </ng-template>
</div>
  `
})
export class WorkoutsComponent {

  workouts$: Observable<Workout[]>;
  subscription: Subscription;
  constructor(private store: Store,private workoutsService: WorkoutsService) { }

  ngOnInit() {
    this.workouts$ = this.store.select<Workout[]>('workouts');
    this.subscription = this.workoutsService.workouts$.subscribe();

  }


  removeWorkout(event: Workout){
    console.log("Remove:", event);
    this.workoutsService.removeWorkout(event.$key);
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
