import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';



import { BannerListPage } from './banner-list.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from '../../components/components.module';
import { TasksListPage } from '../tasks-list/tasks-list.page';

const routes: Routes = [
  {
    path: '',
    component: BannerListPage
  }
];

@NgModule({
  imports: [SharedModule, ComponentsModule, RouterModule.forChild(routes)],
  declarations: [BannerListPage]
})
export class BannerListPageModule {}
