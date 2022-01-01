import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioPage } from './inicio.page';

const routes: Routes = [
  {
    path: 'inicio',
    component: InicioPage,
    children: [
      {
        path: 'cliente',
        loadChildren: () => import('../client/client.module').then(m => m.ClientPageModule)
      },
      {
        path: 'ajustes',
        loadChildren: () => import('../settings/settings.module').then(m => m.SettingsPageModule)
      },
      {
        path: '',
        redirectTo: '/inicio/cliente',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/inicio/cliente',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
