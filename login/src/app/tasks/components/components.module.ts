import { NgModule } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EventoItemComponent } from './evento-item/evento-item.component';
import { BannerItemComponent } from './banner-item/banner-item.component';

@NgModule({
  declarations: [TaskItemComponent, EventoItemComponent, BannerItemComponent],
  imports: [SharedModule],
  exports: [TaskItemComponent, EventoItemComponent, BannerItemComponent]
})
export class ComponentsModule {}
