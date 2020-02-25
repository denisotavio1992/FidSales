import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../services/clientes.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-cliente-save',
  templateUrl: './cliente-save.page.html',
  styleUrls: ['./cliente-save.page.scss']
})
export class ClienteSavePage implements OnInit {
  clienteForm: FormGroup;
  pageTitle = '...';
  clienteId: string = undefined;

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private overlayService: OverlayService,
    private route: ActivatedRoute,
    private clienteService: ClientesService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.init(); // dentro do metodo precisamos do formulario atribuido
  }
  init(): void {
    const clienteId = this.route.snapshot.paramMap.get('id');
    if (!clienteId) {
      this.pageTitle = 'Create Task'; // se nao houver e para criar
      return;
    }
    this.clienteId = clienteId;
    this.pageTitle = 'Edit Task';
    this.clienteService
      .get(clienteId)
      .pipe(take(1))
      .subscribe(({ nome, done }) => {
        this.clienteForm.get('nome').setValue(nome);
        this.clienteForm.get('done').setValue(done);
      });
  }

  private createForm(): void {
    this.clienteForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      done: [false]
    });
  }

  async onSubmit(): Promise<void> {
    const loading = await this.overlayService.loading({
      message: 'Saving...'
    });
    try {
      const task = !this.clienteId
        ? await this.clienteService.create(this.clienteForm.value)
        : await this.clienteService.update({
            id: this.clienteId,
            ...this.clienteForm.value
          });
      this.navCtrl.navigateBack('/tasks');
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
