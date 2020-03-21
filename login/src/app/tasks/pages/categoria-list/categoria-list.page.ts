import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../../models/categoria.model';
import { NavController } from '@ionic/angular';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { CategoriasService } from '../../services/categorias.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-categoria-list',
  templateUrl: './categoria-list.page.html',
  styleUrls: ['./categoria-list.page.scss']
})
export class CategoriaListPage implements OnInit {
  categorias$: Observable<Categoria[]>;

  constructor(
    private navCtrl: NavController,
    private overlayService: OverlayService,
    private categoriasService: CategoriasService
  ) {}

  async ngOnInit(): Promise<void> {
    const loading = await this.overlayService.loading();
    this.categorias$ = this.categoriasService.getAll();
    this.categorias$.pipe(take(1)).subscribe(categorias => loading.dismiss());
  }

  onUpdate(categoria: Categoria): void {
    this.navCtrl.navigateForward(`/tasks/categorias/edit/${categoria.id}`);
  }

  async onDelete(categoria: Categoria): Promise<void> {
    await this.overlayService.alert({
      message: `Voce realmente deseja apagar a tarefa "${categoria.nomeCategoria}"?`,
      buttons: [
        {
          text: 'Sim',
          handler: async () => {
            await this.categoriasService.delete(categoria);
            await this.overlayService.toast({
              message: `Categoria "${categoria.nomeCategoria}" deletada!`
            });
          }
        },
        'Não'
      ]
    });
  }

  async onDone(categoria: Categoria): Promise<void> {
    const categoriaToUpdate = { ...categoria, done: !categoria.done };
    await this.categoriasService.update(categoriaToUpdate);
    await this.overlayService.toast({
      message: `Categoria "${categoria.nomeCategoria}" ${
        categoriaToUpdate.done ? 'completed' : 'updated'
      }!`
    });
  }
}
