import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component } from '@angular/core';

@Component({
  selector: 'app-signal',
  templateUrl: './signal.component.html',
  styleUrls: ['./signal.component.scss']
})
export class SignalComponent implements ModalInnerContent{
  getHeader(): string {
    return "Signal";
  }
  getSources(): string {
    return "Mythras Core Rules 93";
  }
}
