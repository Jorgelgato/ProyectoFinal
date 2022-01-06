import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserPage } from './user.page';

const routes: Routes = [
  {
    path: '',
    component: UserPage
  },
  {
    path: 'modificar',
    loadChildren: () => import('./modify/modify.module').then( m => m.ModifyPageModule)
  },
  {
    path: 'movimientos',
    loadChildren: () => import('./operations/operations.module').then( m => m.OperationsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPageRoutingModule {}
