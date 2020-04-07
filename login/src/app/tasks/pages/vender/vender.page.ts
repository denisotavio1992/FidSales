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

@Component({
  selector: 'app-vender',
  templateUrl: './vender.page.html',
  styleUrls: ['./vender.page.scss']
})
export class VenderPage implements OnInit {
  produtos$: Observable<Produto[]>;
  buscarForm: FormGroup;
  venderForm: FormGroup;
  constructor(
    private navCtrl: NavController,
    private overlayService: OverlayService,
    private produtosService: ProdutosService,
    private celularCategoria: CelularCategoriaService,
    private roupaCategoria: RoupaCategoriaService,
    private tenisCategoria: TenisCategoriaService,
    private perfumeCategoria: PerfumeCategoriaService,
    private maquiagemCategoria: MaquiagemCategoriaService
  ) {}

  async ngOnInit(): Promise<void> {
    const loading = await this.overlayService.loading();
    this.produtos$ = this.produtosService.getAll();
    this.produtos$.pipe(take(1)).subscribe(produtos => loading.dismiss());
  }

  async catCeular(): Promise<void> {
    console.log('teste');
    const loading = await this.overlayService.loading();
    this.produtos$ = this.celularCategoria.getAll();
    this.produtos$.pipe(take(1)).subscribe(produtos => loading.dismiss());
  }
  async addCar(preco: Produto): Promise<void> {
    console.log('produto.');
  }
  async catRoupa(): Promise<void> {
    console.log('teste');
    const loading = await this.overlayService.loading();
    this.produtos$ = this.roupaCategoria.getAll();
    this.produtos$.pipe(take(1)).subscribe(produtos => loading.dismiss());
  }

  async catTenis(): Promise<void> {
    console.log('teste');
    const loading = await this.overlayService.loading();
    this.produtos$ = this.tenisCategoria.getAll();
    this.produtos$.pipe(take(1)).subscribe(produtos => loading.dismiss());
  }

  async catPerfume(): Promise<void> {
    console.log('teste');
    const loading = await this.overlayService.loading();
    this.produtos$ = this.perfumeCategoria.getAll();
    this.produtos$.pipe(take(1)).subscribe(produtos => loading.dismiss());
  }

  async catMaquiagem(): Promise<void> {
    console.log('teste');
    const loading = await this.overlayService.loading();
    this.produtos$ = this.maquiagemCategoria.getAll();
    this.produtos$.pipe(take(1)).subscribe(produtos => loading.dismiss());
  }
}
