import { Injectable } from '@angular/core';
import { Firestore } from 'src/app/core/classes/firestore.class';
import { Produto } from '../models/produto.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BuscarService extends Firestore<Produto> {
  constructor(private authService: AuthService, db: AngularFirestore) {
    super(db);
  }

  private buscarInit(queryText: string): void {
    this.authService.authState$.subscribe(user => {
      if (user) {
        this.setCollection(`/users/${user.uid}/produtos`, ref => ref.where('nome', '==', 'tenis'));
        return;
      }
      this.setCollection(null);
    });
  }
}
