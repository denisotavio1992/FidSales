import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../../models/produto.model';
import { NavController } from '@ionic/angular';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { ProdutosService } from '../../services/produtos.service';
import { take } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { CelularCategoriaService } from '../../services/celular-categoria.service';
import { RoupaCategoriaService } from '../../services/roupa-categoria.service';
import { TenisCategoriaService } from '../../services/tenis-categoria.service';
import { PerfumeCategoriaService } from '../../services/perfume-categoria.service';
import { MaquiagemCategoriaService } from '../../services/maquiagem-categoria.service';
import { BuscarService } from '../../services/buscar.service';
import { parse } from 'querystring';

@Component({
  selector: 'app-vender',
  templateUrl: './vender.page.html',
  styleUrls: ['./vender.page.scss'],
})
export class VenderPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private overlayService: OverlayService,
    private produtosService: ProdutosService,
    private buscarService: BuscarService,
    private celularCategoria: CelularCategoriaService,
    private roupaCategoria: RoupaCategoriaService,
    private tenisCategoria: TenisCategoriaService,
    private perfumeCategoria: PerfumeCategoriaService,
    private maquiagemCategoria: MaquiagemCategoriaService
  ) {}
  produtos$: Observable<Produto[]>;
  produtoAux$: Observable<Produto[]>;
  buscarForm: FormGroup;
  venderForm: FormGroup;
  contador: number;
  totalItem: number;
    // console.log(produto.precoVenda);
    private prdotuto: Produto;

  async ngOnInit(): Promise<void> {
    this.contador = 0;
    this.totalItem = 0;
    const loading = await this.overlayService.loading();
    this.produtos$ = this.produtosService.getAll();
    this.produtos$.pipe(take(1)).subscribe((produtos) => loading.dismiss());
  }

  async catCeular(): Promise<void> {
    console.log('eletronico');
    const loading = await this.overlayService.loading();
    this.produtos$ = this.celularCategoria.getAll();
    this.produtos$.pipe(take(1)).subscribe((produtos) => loading.dismiss());
  }

  async catRoupa(): Promise<void> {
    console.log('teste');
    const loading = await this.overlayService.loading();
    this.produtos$ = this.roupaCategoria.getAll();
    this.produtos$.pipe(take(1)).subscribe((produtos) => loading.dismiss());
  }

  async catTenis(): Promise<void> {
    console.log('teste');
    const loading = await this.overlayService.loading();
    this.produtos$ = this.tenisCategoria.getAll();
    this.produtos$.pipe(take(1)).subscribe((produtos) => loading.dismiss());
  }

  async catPerfume(): Promise<void> {
    console.log('teste');
    const loading = await this.overlayService.loading();
    this.produtos$ = this.perfumeCategoria.getAll();
    this.produtos$.pipe(take(1)).subscribe((produtos) => loading.dismiss());
  }

  async catMaquiagem(): Promise<void> {
    console.log('maquiagem');
    const loading = await this.overlayService.loading();
    this.produtos$ = this.maquiagemCategoria.getAll();
    this.produtos$.pipe(take(1)).subscribe((produtos) => loading.dismiss());
  }

  async addCar(produto: Produto): Promise<void> {
    this.contador = this.contador + 1;
    this.totalItem = this.totalItem + produto.precoVenda;
    // console.log(this.contador);
    // console.log('Carrinho ', this.totalItem);
    this.changeAuthAction(this.contador, this.totalItem);
  }

  changeAuthAction(totalItem: number, xValor: number): void {
    console.log('Itens ', totalItem, 'Total', xValor);
    // this.carrinhoAux.totalItem(totalItem);
    // this.carrinhoAux.xValor(xValor);
  }

}
