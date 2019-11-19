import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'create',
        loadChildren: './pages/task-save/task-save.module#TaskSavePageModule'
      },
      {
        path: 'edit/:id',
        loadChildren: './pages/task-save/task-save.module#TaskSavePageModule'
      },
      {
        path: 'criar-evento',
        loadChildren: './pages/evento-save/evento-save.module#EventoSavePageModule'
      },
      {
        path: 'eventos/edit/:id', // aqui nao esta funcionando a alteração de nome da pagina para edição
        loadChildren: './pages/evento-save/evento-save.module#EventoSavePageModule'
      },
      {
        path: 'eventos',
        loadChildren: './pages/eventos-list/eventos-list.module#EventosListPageModule'
      },
      {
        path: 'banners',
        loadChildren: './pages/banner-list/banner-list.module#BannerListPageModule'
      },
      {
        path: 'criar-banner',
        loadChildren: './pages/banner-save/banner-save.module#BannerSavePageModule'
      },
      {
        path: 'banners/edit/:id',
        loadChildren: './pages/banner-save/banner-save.module#BannerSavePageModule'
      },
      {
        path: '',
        loadChildren: './pages/tasks-list/tasks-list.module#TasksListPageModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule {}
