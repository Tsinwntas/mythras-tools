import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component } from '@angular/core';

@Component({
  selector: 'app-healing-wounds',
  templateUrl: './healing-wounds.component.html',
  styleUrls: ['./healing-wounds.component.scss']
})
export class HealingWoundsComponent implements ModalInnerContent {
  getHeader(): string {
    return "Healing and Wounds";
  }
  getSources(): string {
    return "Mythras Core Rules 46, 110"
  }
}
