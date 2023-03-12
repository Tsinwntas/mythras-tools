import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component } from '@angular/core';

@Component({
  selector: 'app-natural-specials',
  templateUrl: './natural-specials.component.html',
  styleUrls: ['./natural-specials.component.scss']
})
export class NaturalSpecialsComponent implements ModalInnerContent {
  getHeader(): string {
    return "Natural Weapon Special Effects";
  }

  getSources(): string {
    return "Mythras Core Rules 222";
  }
}
