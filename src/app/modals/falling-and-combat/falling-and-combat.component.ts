import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component } from '@angular/core';

@Component({
  selector: 'app-falling-and-combat',
  templateUrl: './falling-and-combat.component.html',
  styleUrls: ['./falling-and-combat.component.scss']
})
export class FallingAndCombatComponent implements ModalInnerContent{
  getHeader(): string {
   return "Falling"; 
  }
  getSources(): string {
    return "Mythras Core Rules 92, 97, 101";
  }
}
