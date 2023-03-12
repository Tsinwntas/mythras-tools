import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component } from '@angular/core';

@Component({
  selector: 'app-delay',
  templateUrl: './delay.component.html',
  styleUrls: ['./delay.component.scss']
})
export class DelayComponent implements ModalInnerContent {
  getHeader(): string {
    return "Delay";
  }

  getSources(): string {
    return "Mythras Core Rules 91";
  }
}
