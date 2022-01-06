import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioPage } from './inicio.page';

const routes: Routes = [
  {
    path: 'inicio',
    component: InicioPage,
    children: [
      {
        path: 'usuario',
        loadChildren: () => import('./user/user.module').then(m => m.UserPageModule)
      },
      {
        path: 'cuenta',
        loadChildren: () => import('./account/account.module').then(m => m.AccountPageModule)
      },
      {
        path: '',
        redirectTo: '/inicio/usuario',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/inicio/usuario',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class InicioRoutingModule {}
