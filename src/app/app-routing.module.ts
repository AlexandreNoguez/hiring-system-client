import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const routes: Routes = [

  {
    path: 'auth',
    children: [
      { path: 'sign-up', loadChildren: () => import("./auth/sign-up/sign-up.module").then(m => m.SignUpModule), },
      { path: "sign-in", loadChildren: () => import("./auth/sign-in/sign-in.module").then(m => m.SignInModule), },
    ],
  },
  {
    path: '', loadChildren: () => import("./pages/home/home.module").then(m => m.HomeModule),
    canActivate: [AuthGuard]
  },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
