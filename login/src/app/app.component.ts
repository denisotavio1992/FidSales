import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  pages: { url: string; direction: string; icon: string; text: string }[];
  user: firebase.User;

  constructor(
    private authService: AuthService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.pages = [
      // indica os caminhos a seguiir nos items do menu eventos-list
      // { url: '/tasks', direction: 'back', icon: 'checkmark', text: 'Tasks' },
      // { url: '/tasks/create', direction: 'forward', icon: 'add', text: 'New Task' },
      // { url: '/tasks/eventos', direction: 'back', icon: 'checkmark', text: 'Eventos' },
      // { url: '/tasks/criar-evento', direction: 'forward', icon: 'add', text: 'Novo Evento' },
      // { url: '/tasks/banners', direction: 'back', icon: 'checkmark', text: 'Banners' },
      // { url: '/tasks/criar-banner', direction: 'forward', icon: 'add', text: 'Novo Banner' },
      // tg
      { url: '/tasks/vender', direction: 'back', icon: 'checkbox', text: 'Vender' },
      { url: '/tasks/produtos', direction: 'forward', icon: 'grid', text: 'Produtos' },
     // { url: '/tasks/categorias', direction: 'forward', icon: 'grid', text: 'Categorias' },
      { url: '/tasks/clientes', direction: 'back', icon: 'person', text: 'Clientes' },
      { url: '/tasks/historico', direction: 'forward', icon: 'logo-usd', text: 'Histórico' },
      { url: '/tasks/estatisticas', direction: 'forward', icon: 'stats', text: 'Estatísticas' },
      { url: '/tasks/configuracoes', direction: 'forward', icon: 'cog', text: 'Configurações' },
      { url: '/tasks/ajuda', direction: 'forward', icon: 'happy', text: 'Ajuda' }
    ];

    this.authService.authState$.subscribe(user => (this.user = user));
    // o codigo acima lista o usuario ue esta logado mostrando seu nome no menu
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
