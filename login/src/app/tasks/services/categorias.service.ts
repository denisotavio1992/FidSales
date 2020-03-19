import { Injectable } from '@angular/core';
import { Firestore } from 'src/app/core/classes/firestore.class';
import { Categoria } from '../models/categoria.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService extends Firestore < Categoria > {
  constructor(private authService: AuthService, db: AngularFirestore) {
    super(db);
    this.init();
  }

  private init(): void {
    this.authService.authState$.subscribe(user => {
      if (user) {
        this.setCollection(`/users/${user.uid}/categorias`, ref =>
          ref.orderBy('done', 'asc').orderBy('nomeCategoria', 'asc')
        );
        return;
      }
      this.setCollection(null);
    });
  }
}
