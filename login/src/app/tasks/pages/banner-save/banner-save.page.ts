import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { BannersService } from '../../services/banners.service';

@Component({
  selector: 'app-banner-save',
  templateUrl: './banner-save.page.html',
  styleUrls: ['./banner-save.page.scss']
})
export class BannerSavePage implements OnInit {
  bannerForm: FormGroup;
  pageTitle = '...';
  bannerId: string = undefined;

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private overlayService: OverlayService,
    private route: ActivatedRoute,
    private bannersService: BannersService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.init(); // dentro do metodo precisamos do formulario atribuido
  }

  init(): void {
    const bannerId = this.route.snapshot.paramMap.get('id');
    if (!bannerId) {
      this.pageTitle = 'Criar Banner'; // se nao houver e para criar
      return;
    }
    this.bannerId = bannerId;
    this.pageTitle = 'Editar Banner';
    this.bannersService
      .get(bannerId)
      .pipe(take(1))
      .subscribe(
        ({
          title,
          ra,
          done,
          aluno,
          nota1,
          nota2,
          nota3,
          nota4,
          nota5,
          notaFinal,
          proOrientador
        }) => {
          this.bannerForm.get('title').setValue(title);
          this.bannerForm.get('done').setValue(done);
          // testando
          this.bannerForm.get('ra').setValue(ra);
          this.bannerForm.get('aluno').setValue(aluno);
          this.bannerForm.get('proOrientador').setValue(proOrientador);
          this.bannerForm.get('nota1').setValue(nota1);
          this.bannerForm.get('nota2').setValue(nota2);
          this.bannerForm.get('nota3').setValue(nota3);
          this.bannerForm.get('nota4').setValue(nota4);
          this.bannerForm.get('nota5').setValue(nota5);
          this.bannerForm.get('notaFinal').setValue(notaFinal);
        }
      );
  }

  private createForm(): void {
    this.bannerForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      ra: ['', [Validators.required, Validators.minLength(3)]],
      aluno: ['', [Validators.required, Validators.minLength(3)]],
      proOrientador: ['', [Validators.required, Validators.minLength(3)]],
      nota1: ['', [Validators.required]],
      nota2: ['', [Validators.required]],
      nota3: ['', [Validators.required]],
      nota4: ['', [Validators.required]],
      nota5: ['', [Validators.required]],
      notaFinal: ['', [Validators.required]],

      done: [false]
    });
  }

  async onSubmit(): Promise<void> {
    const loading = await this.overlayService.loading({
      message: 'Saving...'
    });
    try {
      const banner = !this.bannerId
        ? await this.bannersService.create(this.bannerForm.value)
        : await this.bannersService.update({
            id: this.bannerId,
            ...this.bannerForm.value
          });
      this.navCtrl.navigateBack('/tasks/banners');
    } catch (error) {
      console.log('Error saving Banners: ', error);
      await this.overlayService.toast({
        message: error.message
      });
    } finally {
      loading.dismiss();
    }
  }
}
