import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'schedule-days',
  styleUrls: ['schedule-days.component.scss'],
  template: `
<div class="days">
  <button class="day" type="button" *ngFor="let day of days; index as i" (click)="selectDay(i)">
    <span [class.active]="i === selected">
    {{day}}
    </span>
  </button>

</div>
  `
})
export class ScheduleDaysComponent {
  days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  @Input()
  selected: number;

  @Output()
  select = new EventEmitter<number>()
  constructor() { }

  selectDay(index: number) {
    this.select.emit(index);
  }
}
