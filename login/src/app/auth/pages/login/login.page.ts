import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { AuthProvider } from 'src/app/core/services/auth.types';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  authForm: FormGroup;
  authProvider = AuthProvider;
  configs = {
    // aqui faz as alternmancias do texto
    isSignIn: true,
    action: 'Login',
    actionChange: 'Criar uma conta'
  };

  private nameControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  // acima deixa claro que tem que ter 3 letras o nome para validar o campo e que nao pode ser nulo.
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private overlayService: OverlayService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }
  private createForm(): void {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    }); // O metodo creatForm serve para validar os dados inseridos pelo usuario, se atende as regras estabelecidas
  }
  get name(): FormControl {
    return this.authForm.get('name') as FormControl;
  }

  get email(): FormControl {
    return this.authForm.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.authForm.get('password') as FormControl;
  }

  changeAuthAction(): void {
    this.configs.isSignIn = !this.configs.isSignIn;
    const { isSignIn } = this.configs;
    this.configs.action = isSignIn ? 'Login' : 'Cadastrar';
    this.configs.actionChange = isSignIn ? 'Criar uma conta' : 'Ja tenho conta';
    !isSignIn
      ? this.authForm.addControl('name', this.nameControl)
      : this.authForm.removeControl('name'); // metodo que faz a alteranmcia da login pag
  }
  async onSubmit(provider: AuthProvider): Promise<void> {
    const loading = await this.overlayService.loading();
    try {
      const credentials = await this.authService.authenticate({
        isSignIn: this.configs.isSignIn,
        user: this.authForm.value,
        provider
      });
      // apos o login a pagina que o usuario sera redirecionado
      this.navCtrl.navigateForward(
        this.route.snapshot.queryParamMap.get('redirect') || '/tasks/clientes'
      );
    } catch (e) {
      console.log('Auth error: ', e); //
      await this.overlayService.toast({
        message: e.message
      });
    } finally {
      loading.dismiss();
    }
  }
}
