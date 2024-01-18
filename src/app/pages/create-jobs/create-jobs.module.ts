import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {HeaderComponent} from "../../components/header/header.component";
import {CreateJobsRoutingModule} from "./create-jobs-routing.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CreateJobsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    HeaderComponent
  ]
})
export class CreateJobsModule {
}
