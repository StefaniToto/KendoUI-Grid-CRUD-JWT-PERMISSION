import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { DefaultLayoutComponent } from "./core/components/default-layout/default-layout.component";

// import {
//   AppHeaderModule,
//   AppFooterModule,
//   AppSidebarModule,
//   AppAsideModule,
//   AppBreadcrumbModule,
// } from '@coreui/angular';
import {  HttpClientModule, HttpClientJsonpModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormlyBootstrapModule } from "@ngx-formly/bootstrap";
import { FormlyModule } from "@ngx-formly/core";
import { GridModule } from "@progress/kendo-angular-grid";
import { ToasterModule } from "angular2-toaster";
// import {  PaginationModule } from "ngx-bootstrap";
import { Error404Component } from "./core/components/error404/error404.component";
import { LoginComponent } from "./core/components/login/login.component";
import { ButtoniFormComponent } from "./core/forms/buttoni-form/buttoni-form.component";
import { formlyConfig } from "./core/utility/configs";

import { ExamService } from './modules/exam1/services/examService/exam.service';
import { JwtInterceptor, ErrorInterceptor, fakeBackendProvider } from './core/helpers';
import { IsGrantedDirective } from './core/services/permissions/DPermissions';

const APP_CONTAINERS = [
  DefaultLayoutComponent,
];

@NgModule({
  declarations: [
    AppComponent,
    APP_CONTAINERS,
    LoginComponent,
    ButtoniFormComponent,
    Error404Component,
   // IsGrantedDirective

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormlyModule.forRoot(formlyConfig),
    FormsModule,
    FormlyBootstrapModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToasterModule.forRoot(), // ToastrModule added
    GridModule,
    HttpClientJsonpModule,
   

  ],
  exports : [
    // AppAsideModule,
    // AppSidebarModule,
    // AppHeaderModule,
    // AppFooterModule,
    FormsModule,
    GridModule,
    FormlyBootstrapModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToasterModule,
  ],
  providers: [

    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider,
    ExamService

  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
