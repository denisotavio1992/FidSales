import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cliente } from '../../models/cliente.model';

@Component({
  selector: 'app-cliente-item',
  templateUrl: './cliente-item.component.html',
  styleUrls: ['./cliente-item.component.scss']
})
export class ClienteItemComponent {
  @Input() cliente: Cliente;
  @Output() done = new EventEmitter<Cliente>();
  @Output() update = new EventEmitter<Cliente>();
  @Output() delete = new EventEmitter<Cliente>();
}
