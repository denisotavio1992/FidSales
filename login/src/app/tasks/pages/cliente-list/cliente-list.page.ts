import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../../models/cliente.model';
import { NavController } from '@ionic/angular';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { ClientesService } from '../../services/clientes.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.page.html',
  styleUrls: ['./cliente-list.page.scss']
})
export class ClienteListPage implements OnInit {
  clientes$: Observable<Cliente[]>;

  constructor(
    private navCtrl: NavController,
    private overlayService: OverlayService,
    private clientesService: ClientesService
  ) {}

  async ngOnInit(): Promise<void> {
    const loading = await this.overlayService.loading();
    this.clientes$ = this.clientesService.getAll();
    this.clientes$.pipe(take(1)).subscribe(clientes => loading.dismiss());
  }

  onUpdate(cliente: Cliente): void {
    this.navCtrl.navigateForward(`/tasks/clientes/edit/${cliente.id}`);
  }

  async onDelete(cliente: Cliente): Promise<void> {
    await this.overlayService.alert({
      message: `Voce realmente deseja apagar o cliente "${cliente.nome}"?`,
      buttons: [
        {
          text: 'Sim',
          handler: async () => {
            await this.clientesService.delete(cliente);
            await this.overlayService.toast({
              message: `Cliente "${cliente.nome}" deletado!`
            });
          }
        },
        'Não'
      ]
    });
  }

  async onDone(cliente: Cliente): Promise<void> {
    const clienteToUpdate = { ...cliente, done: !cliente.done };
    await this.clientesService.update(clienteToUpdate);
    await this.overlayService.toast({
      message: `Cliente "${cliente.nome}" ${clienteToUpdate.done ? 'completado' : 'Alteração'}!`
    });
  }
}
