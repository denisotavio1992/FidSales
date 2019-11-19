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
      .subscribe(({ title, done }) => {
        this.bannerForm.get('title').setValue(title);
        this.bannerForm.get('done').setValue(done);
      });
  }

  private createForm(): void {
    this.bannerForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
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
