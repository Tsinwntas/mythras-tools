import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component } from '@angular/core';

@Component({
  selector: 'app-outmanoeuvring',
  templateUrl: './outmanoeuvring.component.html',
  styleUrls: ['./outmanoeuvring.component.scss']
})
export class OutmanoeuvringComponent implements ModalInnerContent {
  getHeader(): string {
    return "Outmanoeuvring";
  }
  getSources(): string {
    return "Mythras Core Rules 104";
  }

}
