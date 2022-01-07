import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountPage } from './account.page';

const routes: Routes = [
  {
    path: '',
    component: AccountPage
  },
  {
    path: 'nueva',
    loadChildren: () => import('./new-account/new-account.module').then( m => m.NewAccountPageModule)
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
export class AccountPageRoutingModule {}
