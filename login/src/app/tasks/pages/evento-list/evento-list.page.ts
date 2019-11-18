import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { OverlayService } from 'src/app/core/services/overlay.service';
import { Task } from '../../models/task.model';
import { TasksService } from '../../services/tasks.service';
import { Evento } from '../../models/evento.model';

@Component({
  selector: 'app-evento-list',
  templateUrl: './evento-list.page.html',
  styleUrls: ['./evento-list.page.scss'],
})
export class EventoListPage implements OnInit {
evento$: Observable<Evento[]>;

  constructor(
    private navCtrl: NavController,
    private overlayService: OverlayService,
    private tasksService: TasksService
  ) { }

  /*
    async ngOnInit(): Promise<void> {
    const loading = await this.overlayService.loading();
    this.evento$ = this.tasksService.getAll();
    this.evento$.pipe(take(1)).subscribe(tasks => loading.dismiss());
  }
  */

  ngOnInit() {
  }

}
