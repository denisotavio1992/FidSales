import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Evento } from '../../models/evento.model';

@Component({
  selector: 'app-evento-item',
  templateUrl: './evento-item.component.html',
  styleUrls: ['./evento-item.component.scss']
})
export class EventoItemComponent {
  @Input() evento: Evento;
  @Output() done = new EventEmitter<Evento>();
  @Output() update = new EventEmitter<Evento>();
  @Output() delete = new EventEmitter<Evento>();
}
