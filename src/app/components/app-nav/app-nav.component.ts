import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush, // Stateless Components have OnPush
  selector: 'app-nav',
  styleUrls: ['app-nav.component.scss'],
  template: `
<div class="app-nav">

  <div class="wrapper">
    <a routerLink="schedule" routerLinkActive="active">Schedule</a>
    <a routerLink="meals" routerLinkActive="active">Meals</a>
    <a routerLink="workouts" routerLinkActive="active">Workouts</a>
  </div>

</div>
  `
})
export class AppNavComponent {
  constructor() {}
}
