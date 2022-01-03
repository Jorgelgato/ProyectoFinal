import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OperationsPage } from './operations.page';

const routes: Routes = [
  {
    path: '',
    component: OperationsPage
  },
  {
    path: 'deposito',
    loadChildren: () => import('../deposit/deposit.module').then( m => m.DepositPageModule)
  },
  {
    path: 'retiro',
    loadChildren: () => import('./withdrawal/withdrawal.module').then( m => m.WithdrawalPageModule)
  },
  {
    path: 'transferencia',
    loadChildren: () => import('./transfer/transfer.module').then( m => m.TransferPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OperationsPageRoutingModule {}
