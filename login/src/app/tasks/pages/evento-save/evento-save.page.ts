import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { take } from 'rxjs/operators';

import { OverlayService } from 'src/app/core/services/overlay.service';
import { EventosService } from '../../services/eventos.service';

@Component({
  selector: 'app-evento-save',
  templateUrl: './evento-save.page.html',
  styleUrls: ['./evento-save.page.scss']
})
export class EventoSavePage implements OnInit {

  eventoForm: FormGroup;
  pageTitle = '...';
  eventoId: string = undefined;

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private overlayService: OverlayService,
    private route: ActivatedRoute,
    private eventosService: EventosService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.init(); // dentro do metodo precisamos do formulario atribuido
  }

  init(): void {
    const eventoId = this.route.snapshot.paramMap.get('id');
    if (!eventoId) {
      this.pageTitle = 'Criar um novo Evento'; // se nao houver e para criar
      return;
    }
    this.eventoId = eventoId;
    this.pageTitle = 'Editar Evento';
    this.eventosService
      .get(eventoId)
      .pipe(take(1))
      .subscribe(({ title, done }) => {
        this.eventoForm.get('title').setValue(title);
        this.eventoForm.get('done').setValue(done);
      });
  }

  private createForm(): void {
    this.eventoForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      done: [false]
    });
  }

  async onSubmit(): Promise<void> {
    const loading = await this.overlayService.loading({
      message: 'Saving...'
    });
    try {
      const task = !this.eventoId
        ? await this.eventosService.create(this.eventoForm.value)
        : await this.eventosService.update({
          id: this.eventoId,
          ...this.eventoForm.value
        });
      this.navCtrl.navigateBack('/tasks/eventos');
    } catch (error) {
      console.log('Error saving Task: ', error);
      await this.overlayService.toast({
        message: error.message
      });
    } finally {
      loading.dismiss();
    }
  }
}
