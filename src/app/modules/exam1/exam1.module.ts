import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Exam1RoutingModule } from './exam1-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { ToasterModule } from 'angular2-toaster';
import { GridModule } from '@progress/kendo-angular-grid';
import { KendoDatatableFormComponent } from './components/kendo-datatable-form/kendo-datatable-form.component';
import { IsGrantedDirective } from '@app/core/services/permissions/DPermissions';


@NgModule({
  declarations: [
    KendoDatatableFormComponent,
    IsGrantedDirective
  ],
  imports: [
    CommonModule,
    Exam1RoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FormlyModule,
    FormlyBootstrapModule,
    RxReactiveFormsModule,
    ToasterModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    GridModule


  ], 
  // providers: [
  //   {
  //     deps: [HttpClient],
  //     provide: EditService,
  //     useFactory: (jsonp: HttpClient) => () => new EditService(jsonp)
  //   }
  // ],

})
export class Exam1Module { }
