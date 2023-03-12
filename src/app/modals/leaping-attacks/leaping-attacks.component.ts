import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component } from '@angular/core';

@Component({
  selector: 'app-leaping-attacks',
  templateUrl: './leaping-attacks.component.html',
  styleUrls: ['./leaping-attacks.component.scss']
})
export class LeapingAttacksComponent implements ModalInnerContent {
  getHeader(): string {
    return "Leaping Attacks";
  }
  getSources(): string {
    return "Mythras Core Rules 104";
  }
}
