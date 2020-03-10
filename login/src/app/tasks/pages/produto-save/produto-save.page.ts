import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { ActivatedRoute } from '@angular/router';
import { ProdutosService } from '../../services/produtos.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-produto-save',
  templateUrl: './produto-save.page.html',
  styleUrls: ['./produto-save.page.scss']
})
export class ProdutoSavePage implements OnInit {
  produtoForm: FormGroup;
  pageTitle = '...';
  produtoId: string = undefined;

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private overlayService: OverlayService,
    private route: ActivatedRoute,
    private produtoService: ProdutosService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.init(); // dentro do metodo precisamos do formulario atribuido
  }
  init(): void {
    const produtoId = this.route.snapshot.paramMap.get('id');
    if (!produtoId) {
      this.pageTitle = 'Cadastrando Produto'; // se nao houver e para criar
      return;
    }
    this.produtoId = produtoId;
    this.pageTitle = 'Editando Produto';
    this.produtoService
      .get(produtoId)
      .pipe(take(1))
      .subscribe(
        ({ nome, precoCusto, precoVenda, categoria, descricao, estoqueMinimo, quantidade, done }) => {
          this.produtoForm.get('nome').setValue(nome);
          this.produtoForm.get('precoCusto').setValue(precoCusto);
          this.produtoForm.get('precoVenda').setValue(precoVenda);
          this.produtoForm.get('categoria').setValue(categoria);
          this.produtoForm.get('descricao').setValue(descricao);
          this.produtoForm.get('estoqueMinimo').setValue(estoqueMinimo);
          this.produtoForm.get('quantidade').setValue(quantidade);
          this.produtoForm.get('done').setValue(done);
        }
      );
  }

  private createForm(): void {
    this.produtoForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      precoCusto: ['', [Validators.required]],
      precoVenda: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      descricao: [''],
      estoqueMinimo: ['', [Validators.required]],
      quantidade: ['', [Validators.required]],
      done: [false]
    });
  }

  async onSubmit(): Promise<void> {
    const loading = await this.overlayService.loading({
      message: 'Saving...'
    });
    try {
      const produto = !this.produtoId
        ? await this.produtoService.create(this.produtoForm.value)
        : await this.produtoService.update({
            id: this.produtoId,
            ...this.produtoForm.value
          });
      this.navCtrl.navigateBack('/tasks/produtos');
    } catch (error) {
      console.log('Erro ao salvar o produto: ', error);
      await this.overlayService.toast({
        message: error.message
      });
    } finally {
      loading.dismiss();
    }
  }
}
