import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

// third-party modules
import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

// shared modules
import { SharedModule } from './shared/shared.module';

export const ROUTES: Routes = [
  {
    path: 'auth',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      { path: 'login', loadChildren: './login/login.module#LoginModule' },
      { path: 'register', loadChildren: './register/register.module#RegisterModule' },
    ]
  }];

export const firebaseConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyD0PAyllywKkV3MIESD73dYDnXiZzJwR6c",
  authDomain: "fitness-app-41c15.firebaseapp.com",
  databaseURL: "https://fitness-app-41c15.firebaseio.com",
  projectId: "fitness-app-41c15",
  storageBucket: "fitness-app-41c15.appspot.com",
  messagingSenderId: "977938165254"
};

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ROUTES),
    AngularFireModule.initializeApp(firebaseConfig), AngularFireAuthModule,
    AngularFireDatabaseModule,
    SharedModule.forRoot() // don't need to call forRoot anywhere else because the root creates on instance.
  ],
  declarations: [],
  providers: []
})
export class AuthModule { }
