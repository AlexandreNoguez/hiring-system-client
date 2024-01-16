import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'sign-in',
    loadChildren: () => import("./auth/sign-in/sign-in.module")
      .then(m => m.SignInModule)
  },
  {
    path: '', loadChildren: () => import("./pages/home/home.module")
      .then(m => m.HomeModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
