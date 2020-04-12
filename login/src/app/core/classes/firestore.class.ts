import { AngularFirestore, AngularFirestoreCollection, QueryFn } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export abstract class Firestore<T extends { id: string }> {
  // classe abstrata do tipo generica

  protected collection: AngularFirestoreCollection<T>;

  constructor(private db: AngularFirestore) {}

  protected setCollection(path: string, queryFn?: QueryFn): void {
    this.collection = path ? this.db.collection(path, queryFn) : null;
  }

  private setItem(item: T, operation: string): Promise<T> {
    // nao alterar esta linha
    return this.collection
      .doc<T>(item.id)
      [operation](item)
      .then(() => item);
  }

  // listar os registros
  getAll(): Observable<T[]> {
    return this.collection.valueChanges();
  }

  get(id: string): Observable<T> {
    return this.collection.doc<T>(id).valueChanges();
  }

  getName(name: string): Observable<T> {
    return this.collection.doc<T>(name).valueChanges();
  }
  create(item: T): Promise<T> {
    item.id = this.db.createId();
    return this.setItem(item, 'set');
  }

  update(item: T): Promise<T> {
    return this.setItem(item, 'update');
  }

  delete(item: T): Promise<void> {
    return this.collection.doc<T>(item.id).delete();
  }
}
