import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component } from '@angular/core';

@Component({
  selector: 'app-luck-point',
  templateUrl: './luck-point.component.html',
  styleUrls: ['./luck-point.component.scss']
})
export class LuckPointComponent implements ModalInnerContent {
  getHeader(): string {
    return "Use Luck Point";
  }
  getSources(): string {
    return "Mythras Core Rules 81, 93";
  }
}
