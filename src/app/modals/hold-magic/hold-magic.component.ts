import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component } from '@angular/core';

@Component({
  selector: 'app-hold-magic',
  templateUrl: './hold-magic.component.html',
  styleUrls: ['./hold-magic.component.scss']
})
export class HoldMagicComponent implements ModalInnerContent {
  getHeader(): string {
    return "Hold Magic";
  }

  getSources(): string {
    return "Mythras Core Rules 91";
  }
}
