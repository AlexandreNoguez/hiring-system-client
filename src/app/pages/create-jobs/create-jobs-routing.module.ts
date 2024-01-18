import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CreateJobsComponent} from "./create-jobs.component";

const routes: Routes = [
  { path: '', component: CreateJobsComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class CreateJobsRoutingModule { }
