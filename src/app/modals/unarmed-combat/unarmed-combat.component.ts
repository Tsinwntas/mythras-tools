import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component } from '@angular/core';

@Component({
  selector: 'app-unarmed-combat',
  templateUrl: './unarmed-combat.component.html',
  styleUrls: ['./unarmed-combat.component.scss']
})
export class UnarmedCombatComponent implements ModalInnerContent{
  getHeader(): string {
    return "Unarmed Combat";
  }

  getSources(): string {
    return "Mythras Core Rules 105,222";
  }
}
