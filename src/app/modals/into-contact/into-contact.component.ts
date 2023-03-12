import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component } from '@angular/core';

@Component({
  selector: 'app-into-contact',
  templateUrl: './into-contact.component.html',
  styleUrls: ['./into-contact.component.scss']
})
export class IntoContactComponent implements ModalInnerContent {
  getHeader(): string {
    return "Charging into contact";
  }
  getSources(): string {
    return "Mythras Core Rules 102";
  }
}
