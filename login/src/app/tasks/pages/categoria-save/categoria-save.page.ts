import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../../services/categorias.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-categoria-save',
  templateUrl: './categoria-save.page.html',
  styleUrls: ['./categoria-save.page.scss']
})
export class CategoriaSavePage implements OnInit {
  categoriaForm: FormGroup;
  pageTitle = '...';
  categoriaId: string = undefined;

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private overlayService: OverlayService,
    private route: ActivatedRoute,
    private categoriasService: CategoriasService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.init(); // dentro do metodo precisamos do formulario atribuido
  }

  init(): void {
    const categoriaId = this.route.snapshot.paramMap.get('id');
    if (!categoriaId) {
      this.pageTitle = 'Criar uma nova categoria'; // se nao houver e para criar
      return;
    }
    this.categoriaId = categoriaId;
    this.pageTitle = 'Editar categoria'; // aqui nao esta sendo exibido
    this.categoriasService
      .get(categoriaId)
      .pipe(take(1))
      .subscribe(({ nomeCategoria, done }) => {
        this.categoriaForm.get('nomeCategoria').setValue(nomeCategoria);
        this.categoriaForm.get('done').setValue(done);
      });
  }

  private createForm(): void {
    this.categoriaForm = this.fb.group({
      nomeCategoria: ['', [Validators.required, Validators.minLength(3)]],
      done: [false]
    });
  }

  async onSubmit(): Promise<void> {
    const loading = await this.overlayService.loading({
      message: 'Salvando...'
    });
    try {
      const categoria = !this.categoriaId
        ? await this.categoriasService.create(this.categoriaForm.value)
        : await this.categoriasService.update({
            id: this.categoriaId,
            ...this.categoriaForm.value
          });
      this.navCtrl.navigateBack('/tasks/categorias');
    } catch (error) {
      console.log('Erro ao salvar categoria: ', error);
      await this.overlayService.toast({
        message: error.message
      });
    } finally {
      loading.dismiss();
    }
  }
}
