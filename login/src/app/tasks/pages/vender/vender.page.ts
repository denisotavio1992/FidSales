import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../../models/produto.model';
import { NavController } from '@ionic/angular';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { ProdutosService } from '../../services/produtos.service';
import { take } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { CelularCategoriaServiceService } from '../../services/celular-categoria-service.service';

@Component({
  selector: 'app-vender',
  templateUrl: './vender.page.html',
  styleUrls: ['./vender.page.scss']
})
export class VenderPage implements OnInit {
  produtos$: Observable<Produto[]>;
  produtosCatCelular$: Observable<Produto[]>;
  produtosCatMaquiagem$: Observable<Produto[]>;
  produtos$CatTenis$: Observable<Produto[]>;
  buscarForm: FormGroup;
  constructor(
    private navCtrl: NavController,
    private overlayService: OverlayService,
    private produtosService: ProdutosService,
    private celularCategoria: CelularCategoriaServiceService
  ) {}

  async ngOnInit(): Promise<void> {
    const loading = await this.overlayService.loading();
    this.produtos$ = this.produtosService.getAll();
    this.produtos$.pipe(take(1)).subscribe(produtos => loading.dismiss());
  }

  async catCeular(): Promise<void> {
    console.log('teste');
    const loading = await this.overlayService.loading();
    this.produtosCatCelular$ = this.celularCategoria.getAll();
    this.produtosCatCelular$.pipe(take(1)).subscribe(produtos => loading.dismiss());
  }

  async changeAuthAction(): Promise <void> {
    const loading = await this.overlayService.loading();
    this.produtos$ = this.celularCategoria.getAll();
    this.produtos$.pipe(take(1)).subscribe(produtos => loading.dismiss());
  }

  async posterioemente(): Promise<void> {
    const loading = await this.overlayService.loading();
    this.produtos$ = this.celularCategoria.getAll();
    this.produtos$.pipe(take(1)).subscribe(produtos => loading.dismiss());
  }
}
