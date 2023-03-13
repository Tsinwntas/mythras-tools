import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component } from '@angular/core';

@Component({
  selector: 'app-deadly-ability',
  templateUrl: './deadly-ability.component.html',
  styleUrls: ['./deadly-ability.component.scss']
})
export class DeadlyAbilityComponent implements ModalInnerContent {
  getHeader(): string {
    return "Spirit Ability: Deadly";
  }
  getSources(): string {
    return "Mythras Core Rules 143";
  }
}
