import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntrancePageComponent } from './entrance-page/entrance-page.component';

const routes: Routes = [
  {path: "", component: EntrancePageComponent, pathMatch: 'full'},

{path: "**", redirectTo: "/"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
