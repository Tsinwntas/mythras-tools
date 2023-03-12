import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component } from '@angular/core';

@Component({
  selector: 'app-magic-situational',
  templateUrl: './magic-situational.component.html',
  styleUrls: ['./magic-situational.component.scss']
})
export class MagicSituationalComponent implements ModalInnerContent {
  getHeader(): string {
    return "Magical Requirmenets";
  }
  getSources(): string {
    return "Mythras Core Rules 119";
  }
}
