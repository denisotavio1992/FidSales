import { Injectable } from '@angular/core';
import { Firestore } from 'src/app/core/classes/firestore.class';
import { AuthService } from 'src/app/core/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Cliente } from '../models/cliente.model';
@Injectable({
  providedIn: 'root'
})
export class ClientesService extends Firestore<Cliente> {
  constructor(private authService: AuthService, db: AngularFirestore) {
    super(db);
    this.init();
  }

  private init(): void {
    this.authService.authState$.subscribe(user => {
      if (user) {
        this.setCollection(`/users/${user.uid}/clientes`, ref =>
          ref.orderBy('done', 'asc').orderBy('title', 'asc')
        );
        return;
      }
      this.setCollection(null);
    });
  }
}
