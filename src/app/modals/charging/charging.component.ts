import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component } from '@angular/core';

@Component({
  selector: 'app-charging',
  templateUrl: './charging.component.html',
  styleUrls: ['./charging.component.scss']
})
export class ChargingComponent implements ModalInnerContent {
  getHeader(): string {
    return "Charging"
  }
  getSources(): string {
    return "Mythras Core Rules 102";
  }
}
