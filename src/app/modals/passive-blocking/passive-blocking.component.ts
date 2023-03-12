import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component } from '@angular/core';

@Component({
  selector: 'app-passive-blocking',
  templateUrl: './passive-blocking.component.html',
  styleUrls: ['./passive-blocking.component.scss']
})
export class PassiveBlockingComponent implements ModalInnerContent{
  getHeader(): string {
    return "Passive Blocking";
  }
  getSources(): string {
    return "Mythras Core Rules 93,105";
  }
}
