import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreateSkillsComponent} from "./create-skills.component";
import {CreateSkillsRoutingModule} from "./create-skills-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {HeaderComponent} from "../../components/header/header.component";


@NgModule({
  declarations: [
    CreateSkillsComponent
  ],
  imports: [
    CommonModule,
    CreateSkillsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    HeaderComponent,
  ]
})
export class CreateSkillsModule { }
