import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InicioRoutingModule } from './inicio-routing.module';

import { InicioPage } from './inicio.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    InicioRoutingModule,
    RouterModule
  ],
  declarations: [InicioPage]
})
export class TabsPageModule {}
