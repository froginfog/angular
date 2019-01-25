import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {InfoComponent} from '../info/info.component';
import {LoginComponent} from '../login/login.component';
import {KeywordsComponent} from '../keywords/keywords.component';

const routes: Routes = [
  {path: '', redirectTo: '/info', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'info', component: InfoComponent},
  {path: 'keywords', component: KeywordsComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
