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
      } /*
      {
        path: '',
        loadChildren: './pages/tasks-list/tasks-list.module#TasksListPageModule'
      },*/,
      {
        path: '',
        loadChildren: './pages/eventos-list/eventos-list.module#EventosListPageModule'
      },
      {
        path: 'clientes',
        loadChildren: './pages/cliente-list/cliente-list.module#ClienteListPageModule'
      },
      {
        path: 'clientes/edit/:id',
        loadChildren: './pages/cliente-save/cliente-save.module#ClienteSavePageModule'
      },
      {
        path: 'criar-cliente',
        loadChildren: './pages/cliente-save/cliente-save.module#ClienteSavePageModule'
      },
      {
        path: 'produtos',
        loadChildren: './pages/produto-list/produto-list.module#ProdutoListPageModule'
      },
      { path: 'historico', loadChildren: './pages/historico/historico.module#HistoricoPageModule' },
      {
        path: 'estatisticas',
        loadChildren: './pages/estatisticas/estatisticas.module#EstatisticasPageModule'
      },
      {
        path: 'configuracoes',
        loadChildren: './pages/configuracoes/configuracoes.module#ConfiguracoesPageModule'
      },
      { path: 'vender', loadChildren: './pages/vender/vender.module#VenderPageModule' },
      { path: 'ajuda', loadChildren: './pages/ajuda/ajuda.module#AjudaPageModule' },
      {
        path: 'criar-produto',
        loadChildren: './pages/produto-save/produto-save.module#ProdutoSavePageModule'
      },
      {
        path: 'produtos/edit/:id',
        loadChildren: './pages/produto-save/produto-save.module#ProdutoSavePageModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule {}
