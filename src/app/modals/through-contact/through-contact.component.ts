import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component } from '@angular/core';

@Component({
  selector: 'app-through-contact',
  templateUrl: './through-contact.component.html',
  styleUrls: ['./through-contact.component.scss']
})
export class ThroughContactComponent implements ModalInnerContent {
  getHeader(): string {
    return "Charging through contact";
  }
  getSources(): string {
    return "Mythras Core Rules 102";
  }
}
