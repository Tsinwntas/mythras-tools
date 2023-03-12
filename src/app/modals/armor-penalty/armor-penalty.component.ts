import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component } from '@angular/core';

@Component({
  selector: 'app-armor-penalty',
  templateUrl: './armor-penalty.component.html',
  styleUrls: ['./armor-penalty.component.scss']
})
export class ArmorPenaltyComponent implements ModalInnerContent {
  getHeader(): string {
    return "Armor Penalty";
  }
  getSources(): string {
    return "Mythras Core Rules 58"
  }
}
