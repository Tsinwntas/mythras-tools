import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component } from '@angular/core';

@Component({
  selector: 'app-running-out-of-mana',
  templateUrl: './running-out-of-mana.component.html',
  styleUrls: ['./running-out-of-mana.component.scss']
})
export class RunningOutOfManaComponent implements ModalInnerContent {
  getHeader(): string {
    return "Running out of Magic Points";
  }
  getSources(): string {
    return "Mythras Core Rules 117";
  }
}
