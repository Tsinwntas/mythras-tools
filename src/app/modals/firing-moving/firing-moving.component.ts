import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component } from '@angular/core';

@Component({
  selector: 'app-firing-moving',
  templateUrl: './firing-moving.component.html',
  styleUrls: ['./firing-moving.component.scss']
})
export class FiringMovingComponent implements ModalInnerContent {
  getHeader(): string {
    return "Firing on the Move";
  }
  getSources(): string {
    return "Mythras Core Rules 89, 108";
  }
}
