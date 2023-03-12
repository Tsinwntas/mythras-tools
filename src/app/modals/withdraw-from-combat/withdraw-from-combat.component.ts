import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component } from '@angular/core';

@Component({
  selector: 'app-withdraw-from-combat',
  templateUrl: './withdraw-from-combat.component.html',
  styleUrls: ['./withdraw-from-combat.component.scss']
})
export class WithdrawFromCombatComponent implements ModalInnerContent {
  getHeader(): string {
    return "Withdraw from Combat";
  }
  getSources(): string {
    return "Mythras Core Rules 92, 101,104, 106";
  }
}
