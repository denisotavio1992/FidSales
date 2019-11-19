import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

import { EventoSavePage } from './evento-save.page';

const routes: Routes = [
  {
    path: '',
    component: EventoSavePage
  }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [EventoSavePage]
})
export class EventoSavePageModule {}
