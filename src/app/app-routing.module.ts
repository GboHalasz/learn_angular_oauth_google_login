import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntrancePageComponent } from './entrance-page/entrance-page.component';
import { LoginpageComponent } from './loginpage/loginpage.component';

const routes: Routes = [
  {path: "", component: EntrancePageComponent, pathMatch: 'full'},
  {path: "login", component: LoginpageComponent},

{path: "**", redirectTo: "/"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
