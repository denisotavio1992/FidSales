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
        path: 'eventos',
        loadChildren: './pages/eventos-list/eventos-list.module#EventosListPageModule'
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
