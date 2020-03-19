import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Categoria } from '../../models/categoria.model';

@Component({
  selector: 'app-categoria-item',
  templateUrl: './categoria-item.component.html',
  styleUrls: ['./categoria-item.component.scss']
})
export class CategoriaItemComponent {
  @Input() categoria: Categoria;
  @Output() done = new EventEmitter<Categoria>();
  @Output() update = new EventEmitter<Categoria>();
  @Output() delete = new EventEmitter<Categoria>();
}
