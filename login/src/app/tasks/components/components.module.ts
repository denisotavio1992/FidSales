import { NgModule } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EventoItemComponent } from './evento-item/evento-item.component';
import { BannerItemComponent } from './banner-item/banner-item.component';
import { ClienteItemComponent } from './cliente-item/cliente-item.component';
import { ProdutoItemComponent } from './produto-item/produto-item.component';
import { CategoriaItemComponent } from './categoria-item/categoria-item.component';

@NgModule({
  declarations: [
    ProdutoItemComponent,
    TaskItemComponent,
    EventoItemComponent,
    BannerItemComponent,
    ClienteItemComponent,
    CategoriaItemComponent
  ],
  imports: [SharedModule],
  exports: [
    ProdutoItemComponent,
    TaskItemComponent,
    EventoItemComponent,
    BannerItemComponent,
    ClienteItemComponent,
    CategoriaItemComponent
  ]
})
export class ComponentsModule {}
