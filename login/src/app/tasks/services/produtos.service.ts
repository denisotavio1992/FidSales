import { Injectable } from '@angular/core';
import { Firestore } from 'src/app/core/classes/firestore.class';
import { AuthService } from 'src/app/core/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Produto } from '../models/produto.model';
@Injectable({
  providedIn: 'root'
})
export class ProdutosService extends Firestore<Produto> {
  constructor(private authService: AuthService, db: AngularFirestore) {
    super(db);
    this.init();
  }

  private init(): void {
    this.authService.authState$.subscribe(user => {
      if (user) {
        this.setCollection(`/users/${user.uid}/produtos`, ref => ref.orderBy('nome', 'asc'));
        return;
      }
      this.setCollection(null);
    });
  }

  private buscar(queryText: string): void {
    this.authService.authState$.subscribe(user => {
      if (user) {
        this.setCollection(`/users/${user.uid}/produtos`, ref => ref.where('nome', '==', queryText));
        return;
      }
      this.setCollection(null);
    });
  }
}
