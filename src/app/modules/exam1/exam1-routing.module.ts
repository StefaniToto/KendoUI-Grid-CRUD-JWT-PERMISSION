import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { KendoDatatableFormComponent } from './components/kendo-datatable-form/kendo-datatable-form.component';

const routes: Routes = [

  {
    path: "",
    data: {
      title: "Exam 1",
    },
    children: [
      {
        path: "",
        redirectTo: "main",
        pathMatch: "full",
      },
      {
        path: "main",
        component: KendoDatatableFormComponent,
        data: {
          title: "Kendo Page",
        },
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Exam1RoutingModule { }
