import { NgModule } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EventoItemComponent } from './evento-item/evento-item.component';

@NgModule({
  declarations: [TaskItemComponent, EventoItemComponent],
  imports: [SharedModule],
  exports: [TaskItemComponent, EventoItemComponent]
})
export class ComponentsModule {}
