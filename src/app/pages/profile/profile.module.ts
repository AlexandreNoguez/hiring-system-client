import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from "../../components/header/header.component";
import {ProfileComponent} from "./profile.component";
import {ProfileRoutingModule} from "./profile-routing.module";


@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    HeaderComponent
  ]
})
export class ProfileModule { }
