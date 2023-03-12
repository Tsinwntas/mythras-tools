import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component } from '@angular/core';

@Component({
  selector: 'app-spirit-combat',
  templateUrl: './spirit-combat.component.html',
  styleUrls: ['./spirit-combat.component.scss']
})
export class SpiritCombatComponent implements ModalInnerContent {
  getHeader(): string {
    return "Spirit Combat";
  }
  getSources(): string {
    return "Mythras Core Rules 137-138";
  }
}
