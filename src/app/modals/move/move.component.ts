import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component } from '@angular/core';

@Component({
  selector: 'app-move',
  templateUrl: './move.component.html',
  styleUrls: ['./move.component.scss']
})
export class MoveComponent implements ModalInnerContent {
  getHeader(): string {
    return "Move";
  }

  getSources(): string {
    return "Mythras Core Rules 91";
  }
}
