import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientPage } from './client.page';

const routes: Routes = [
  {
    path: '',
    component: ClientPage
  },
  {
    path: 'modificar',
    loadChildren: () => import('./modify/modify.module').then( m => m.ModifyPageModule)
  },
  {
    path: 'movimientos',
    loadChildren: () => import('../client/operations/operations.module').then( m => m.OperationsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientPageRoutingModule {}
