import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CreateSkillsComponent} from "./create-skills.component";

const routes: Routes = [
  { path: '', component: CreateSkillsComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class CreateSkillsRoutingModule { }
