import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component } from '@angular/core';

@Component({
  selector: 'app-ranged-situational',
  templateUrl: './ranged-situational.component.html',
  styleUrls: ['./ranged-situational.component.scss']
})
export class RangedSituationalComponent implements ModalInnerContent {
  getHeader(): string {
    return "Ranged Situational";
  }
  getSources(): string {
    return "Mythras Core Rules 108";
  }
}
