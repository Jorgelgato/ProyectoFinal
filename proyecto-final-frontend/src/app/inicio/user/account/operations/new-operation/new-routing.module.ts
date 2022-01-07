import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewOperationPage } from './new-operation.page';

const routes: Routes = [
  {
    path: '',
    component: NewOperationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewPageRoutingModule {}
