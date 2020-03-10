import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { ProdutosService } from '../../services/produtos.service';
import { take } from 'rxjs/operators';
import { Produto } from '../../models/produto.model';
@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.page.html',
  styleUrls: ['./produto-list.page.scss']
})
export class ProdutoListPage implements OnInit {
  produtos$: Observable<Produto[]>;

  constructor(
    private navCtrl: NavController,
    private overlayService: OverlayService,
    private produtosService: ProdutosService
  ) {}

  async ngOnInit(): Promise<void> {
    const loading = await this.overlayService.loading();
    this.produtos$ = this.produtosService.getAll();
    this.produtos$.pipe(take(1)).subscribe(produtos => loading.dismiss());
  }
  onUpdate(produto: Produto): void {
    this.navCtrl.navigateForward(`/tasks/produtos/edit/${produto.id}`);
  }

  async onDelete(produto: Produto): Promise<void> {
    await this.overlayService.alert({
      message: `Voce realmente deseja apagar o produto "${produto.nome}"?`,
      buttons: [
        {
          text: 'Sim',
          handler: async () => {
            await this.produtosService.delete(produto);
            await this.overlayService.toast({
              message: `Produto "${produto.nome}" deletada!`
            });
          }
        },
        'Não'
      ]
    });
  }

  async onDone(produto: Produto): Promise<void> {
    const produtoToUpdate = { ...produto, done: !produto.done };
    await this.produtosService.update(produtoToUpdate);
    await this.overlayService.toast({
      message: `Produto "${produto.nome}" ${produtoToUpdate.done ? 'completed' : 'updated'}!`
    });
  }
}
