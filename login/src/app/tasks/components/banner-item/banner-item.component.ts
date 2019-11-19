import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Banner } from '../../models/banner.model';

@Component({
  selector: 'app-banner-item',
  templateUrl: './banner-item.component.html',
  styleUrls: ['./banner-item.component.scss']
})
export class BannerItemComponent {
  @Input() banner: Banner;
  @Output() done = new EventEmitter<Banner>();
  @Output() update = new EventEmitter<Banner>();
  @Output() delete = new EventEmitter<Banner>();
}
