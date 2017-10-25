import { Component, ChangeDetectionStrategy, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

// Register Control
export const TYPE_CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => WorkoutTypeComponent),
  multi: true
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TYPE_CONTROL_ACCESSOR],
  selector: 'workout-type',
  styleUrls: ['workout-type.component.scss'],
  template: `
<div class="workout-type">
    <div class="workout-type__pane" *ngFor="let selector of selectors" [class.active]="selector === value" (click)="setSelected(selector)">
      <img src="/img/{{selector}}.svg">
      <p>{{selector}}</p>
    </div>
</div>
  `
})
export class WorkoutTypeComponent implements ControlValueAccessor  {

  selectors = ['strength', 'endurance'];
  value: string;

  private onTouch: Function;
  private onModuleChange: Function;

  // Provides us a function and keep it locally inside the workout component
  registerOnTouched(fn: Function) {
    this.onTouch = fn;
  }

  /** When the component is changed. */
  registerOnChange(fn: Function) {
    this.onModuleChange = fn;
  }

  writeValue(value: string ) {
    this.value = value; // Given By the Form when it comes through
  }

  setSelected(value: string) {
    this.value = value;
    this.onModuleChange(value);
    this.onTouch();
  }

}
