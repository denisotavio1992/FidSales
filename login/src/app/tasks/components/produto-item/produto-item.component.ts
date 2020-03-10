import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Produto } from '../../models/produto.model';

@Component({
  selector: 'app-produto-item',
  templateUrl: './produto-item.component.html',
  styleUrls: ['./produto-item.component.scss']
})
export class ProdutoItemComponent {
  @Input() produto: Produto;
  @Output() done = new EventEmitter<Produto>();
  @Output() update = new EventEmitter<Produto>();
  @Output() delete = new EventEmitter<Produto>();
}
