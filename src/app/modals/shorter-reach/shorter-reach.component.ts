import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component } from '@angular/core';

@Component({
  selector: 'app-shorter-reach',
  templateUrl: './shorter-reach.component.html',
  styleUrls: ['./shorter-reach.component.scss']
})
export class ShorterReachComponent implements ModalInnerContent{
  getHeader(): string {
    return "Shorter Reach";
  }

  getSources(): string {
    return "Mythras Core Rules 108, 222";
  }
}
