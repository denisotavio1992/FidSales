import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { Evento } from '../../models/evento.model';
import { EventosService } from '../../services/eventos.service';
import { Banner } from '../../models/banner.model';
import { BannersService } from '../../services/banners.service';

@Component({
  selector: 'app-banner-list',
  templateUrl: './banner-list.page.html',
  styleUrls: ['./banner-list.page.scss']
})
export class BannerListPage implements OnInit {
  banners$: Observable<Banner[]>;

  constructor(
    private navCtrl: NavController,
    private overlayService: OverlayService,
    private bannersService: BannersService
  ) {}

  async ngOnInit(): Promise<void> {
    const loading = await this.overlayService.loading();
    this.banners$ = this.bannersService.getAll();
    this.banners$.pipe(take(1)).subscribe(banners => loading.dismiss());
  }

  onUpdate(banner: Banner): void {
    this.navCtrl.navigateForward(`/tasks/banners/edit/${banner.id}`);
  }
  async onDelete(banner: Banner): Promise<void> {
    await this.overlayService.alert({
      message: `Voce realmente deseja apagar a tarefa "${banner.title}"?`,
      buttons: [
        {
          text: 'Sim',
          handler: async () => {
            await this.bannersService.delete(banner);
            await this.overlayService.toast({
              message: `Evento "${banner.title}" deleted!`
            });
          }
        },
        'Não'
      ]
    });
  }

  async onDone(banner: Banner): Promise<void> {
    const bannerToUpdate = { ...banner, done: !banner.done };
    await this.bannersService.update(bannerToUpdate);
    await this.overlayService.toast({
      message: `Task "${banner.title}" ${bannerToUpdate.done ? 'completed' : 'updated'}!`
    });
  }
}
