import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validator, FormControl, Validators } from '@angular/forms'

import { Meal } from '../../../shared/services/meals/meals.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'meal-form',
  styleUrls: ['meal-form.component.scss'],
  template: `
<div class="meal-form">

  <form [formGroup]="form">

    <div class="meal-form__name">
      <label>
        <h3>Meal name</h3>
        <input type="text" placeholder="e.g. English Breakfast" formControlName="name">
        <div class="error" *ngIf="required">
          Name is required
        </div>
      </label>
    </div>

    <div class="meal-form__food">
      <div class="meal-form__subtitle">
        <h3>Food</h3>
        <button (click)="addIngredient()" class="meal-form__add" type="button">
          <img src="/img/add-white.svg" alt="">
          Add Food
        </button>
      </div>
      <div formArrayName="ingredients">
        <label *ngFor="let c of ingredients.controls; index as i;">
          <input [formControlName]="i" placeholder="e.g. Eggs">
          <span class="meal-form__remove" (click)="removeIngredient(i)"></span>
        </label>
      </div>
    </div>

    <div class="meal-form__submit">
      <div>
        <button class="button" (click)="createMeal()"  *ngIf="!exists" type="button">Create Meal</button>
        <button class="button" (click)="updateMeal()" *ngIf="exists" type="button">Update Meal</button>
        <a class="button button--cancel" [routerLink]="['../']">Cancel</a>
      </div>

      <div>
        <div class="meal-form__delete" *ngIf="exists" >
          <div *ngIf="toggled">
            <p>Delete item?</p>
            <button class="confirm" type="confirm" (click)="removeMeal()">Yes</button>
            <button class="confirm" type="cancel" (click)="toggle()">No</button>
          </div>
          <button class="button button--delete" type="button" (click)="toggle()">Delete</button>
        </div>
      </div>
    </div>
 </form>
</div>
`
})
export class MealFormComponent implements OnChanges {
  toggled = false;
  exists = false;
  @Input()
  meal: Meal;

  @Output()
  create = new EventEmitter<Meal>();

  @Output()
  update = new EventEmitter<Meal>();

  @Output()
  remove = new EventEmitter<Meal>();

  form = this.fb.group({
    name: ['', Validators.required],
    ingredients: this.fb.array([''])
  })

  constructor(private fb: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.meal && this.meal.name) {
      this.exists = true;
      const value = this.meal;
      this.form.patchValue(value);

      this.emptyIngredients();

      if(value.ingredients){
        for(const item of value.ingredients) {
          this.ingredients.push(new FormControl(item))
        }
      }
    }
  }

  emptyIngredients() {
    while(this.ingredients.controls.length) {
      this.ingredients.removeAt(0);
    }
  }

  get ingredients() {
    return this.form.get('ingredients') as FormArray;
  }

  get required() {
    return this.form.get('name').hasError('required') && this.form.get('name').touched;
  }

  createMeal() {
    if (this.form.valid) {
      this.create.emit(this.form.value);
    }
  }

  updateMeal(){
    if (this.form.valid) {
      this.update.emit(this.form.value);
    }
  }

  removeMeal(){
    this.remove.emit(this.form.value);
  }

  addIngredient() {
    this.ingredients.push(new FormControl(''));
  }
  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  toggle() {
    this.toggled = !this.toggled;
  }
}
