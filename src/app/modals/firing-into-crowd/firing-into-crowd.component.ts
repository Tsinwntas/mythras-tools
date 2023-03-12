import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component } from '@angular/core';

@Component({
  selector: 'app-firing-into-crowd',
  templateUrl: './firing-into-crowd.component.html',
  styleUrls: ['./firing-into-crowd.component.scss']
})
export class FiringIntoCrowdComponent implements ModalInnerContent {
  getHeader(): string {
    return "Firing into a Crowd";
  }
  getSources(): string {
    return "Mythras Core Rules 108";
  }
}
