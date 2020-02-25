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
      this.pageTitle = 'Cadastrando cliente'; // se nao houver e para criar
      return;
    }
    this.clienteId = clienteId;
    this.pageTitle = 'Editando Cliente';
    this.clienteService
      .get(clienteId)
      .pipe(take(1))
      .subscribe(({ nome, done, celular, endereco, sexo, idade }) => {
        this.clienteForm.get('nome').setValue(nome);
        this.clienteForm.get('celular').setValue(celular);
        this.clienteForm.get('endereco').setValue(endereco);
        this.clienteForm.get('sexo').setValue(sexo);
        this.clienteForm.get('idade').setValue(idade);
        this.clienteForm.get('done').setValue(done);
      });
  }

  private createForm(): void {
    this.clienteForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      celular: ['', [Validators.required, Validators.minLength(9)]],
      endereco: ['', [ Validators.minLength(5)]],
      sexo: ['', [Validators.required, Validators.minLength(1)]],
      idade: ['', [ Validators.minLength(2)]],
      done: [false]
    });
  }

  async onSubmit(): Promise<void> {
    const loading = await this.overlayService.loading({
      message: 'Saving...'
    });
    try {
      const cliente = !this.clienteId
        ? await this.clienteService.create(this.clienteForm.value)
        : await this.clienteService.update({
            id: this.clienteId,
            ...this.clienteForm.value
          });
      this.navCtrl.navigateBack('/tasks/clientes');
    } catch (error) {
      console.log('Error saving Clientes: ', error);
      await this.overlayService.toast({
        message: error.message
      });
    } finally {
      loading.dismiss();
    }
  }
}
