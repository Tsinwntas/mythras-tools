import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cast-magic',
  templateUrl: './cast-magic.component.html',
  styleUrls: ['./cast-magic.component.scss']
})
export class CastMagicComponent implements ModalInnerContent {
  getHeader(): string {
    return "Cast Magic";
  }

  getSources(): string {
    return "Mythras Core Rules 91";
  }
}
