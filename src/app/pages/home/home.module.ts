import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {HomeRoutingModule} from './home-routing.module';
import {HeaderComponent} from 'src/app/components/header/header.component';
import {RoleCardComponent} from "../../components/role-card/role-card.component";
import {FormsModule} from "@angular/forms";
import {SearchFilterPipe} from "../../pipes/search-filter.pipe";


@NgModule({
  declarations: [
    HomeComponent,
    SearchFilterPipe
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HeaderComponent,
    RoleCardComponent,
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule { }
