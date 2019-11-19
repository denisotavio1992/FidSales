import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { TasksService } from '../../services/tasks.service';
import { Evento } from '../../models/evento.model';
import { EventosService } from '../../services/eventos.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-eventos-list',
  templateUrl: './eventos-list.page.html',
  styleUrls: ['./eventos-list.page.scss'],
})
export class EventosListPage implements OnInit {
eventos$: Observable<Evento[]>;

  constructor(
    private navCtrl: NavController,
    private overlayService: OverlayService,
    private tasksService: TasksService,
    private eventosService: EventosService
  ) { }

  async ngOnInit(): Promise<void> {
    const loading = await this.overlayService.loading();
    this.eventos$ = this.eventosService.getAll();
    this.eventos$.pipe(take(1)).subscribe(eventos => loading.dismiss());
  }

    onUpdate(evento: Evento): void {
    this.navCtrl.navigateForward(['eventos', 'edit', evento.id]);
  }

  async onDelete(evento: Evento): Promise<void> {
    await this.overlayService.alert({
      message: `Voce realmente deseja apagar a tarefa "${evento.title}"?`,
      buttons: [
        {
          text: 'Sim',
          handler: async () => {
            await this.eventosService.delete(evento);
            await this.overlayService.toast({
              message: `Task "${evento.title}" deleted!`
            });
          }
        },
        'Não'
      ]
    });
  }

  async onDone(evento: Evento): Promise<void> {
    const eventosToUpdate = { ...evento, done: !evento.done };
    await this.eventosService.update(eventosToUpdate);
    await this.overlayService.toast({
      message: `Evento "${evento.title}" ${eventosToUpdate.done ? 'completed' : 'updated'}!`
    });
  }

}
