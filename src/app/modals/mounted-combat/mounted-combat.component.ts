import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component } from '@angular/core';

@Component({
  selector: 'app-mounted-combat',
  templateUrl: './mounted-combat.component.html',
  styleUrls: ['./mounted-combat.component.scss']
})
export class MountedCombatComponent implements ModalInnerContent {
  getHeader(): string {
    return "Mounted Combat";
  }
  getSources(): string {
    return "Mythras Core Rules 104";
  }
}
