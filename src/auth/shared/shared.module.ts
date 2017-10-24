import { NgModule, ModuleWithProviders } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// components
import { AuthFormComponent } from './components/auth-form/auth-form.component';

// services
import { AuthService } from './services/auth/auth.service';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [AuthFormComponent],
  exports: [AuthFormComponent]
})
export class SharedModule {
  /** added bc we don't want to duplicate the providers */
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        AuthService
      ]
    };
  }
}
