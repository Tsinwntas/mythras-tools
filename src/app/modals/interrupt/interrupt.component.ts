import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component } from '@angular/core';

@Component({
  selector: 'app-interrupt',
  templateUrl: './interrupt.component.html',
  styleUrls: ['./interrupt.component.scss']
})
export class InterruptComponent implements ModalInnerContent {
  getHeader(): string {
    return "Interrupt";
  }
  getSources(): string {
    return "Mythras Core Rules 92";
  }
}
