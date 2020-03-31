import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../../models/produto.model';
import { NavController } from '@ionic/angular';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { ProdutosService } from '../../services/produtos.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-vender',
  templateUrl: './vender.page.html',
  styleUrls: ['./vender.page.scss']
})
export class VenderPage implements OnInit {
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
}
