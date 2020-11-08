import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SecurityRouterActivate } from './security-router-activate';

import { SecurityComponent } from './security.component';
import { SystemLoginComponent } from './component/system-login/system-login.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [SecurityRouterActivate],
    component: SecurityComponent,
    children: [
      { path: '', canActivate: [SecurityRouterActivate], component: SystemLoginComponent },
      { path: 'system-login', canActivate: [SecurityRouterActivate], component: SystemLoginComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
