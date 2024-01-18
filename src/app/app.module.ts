import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterOutlet} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthGuard} from './auth.guard';
import {AuthService} from './service/auth.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {AuthInterceptor} from './auth/auth-interceptor/auth.interceptor';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {CreateJobsComponent} from './pages/create-jobs/create-jobs.component';
import {HeaderComponent} from "./components/header/header.component";
import {MatTreeModule} from "@angular/material/tree";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";

@NgModule({
  declarations: [
    AppComponent,
    CreateJobsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterOutlet,
    CommonModule,
    MatSnackBarModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    HeaderComponent,
    MatTreeModule,
    MatButtonModule,
    MatSelectModule,
    // NgxMaskPipe
    // NgxMaskDirective
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    JwtHelperService,
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
