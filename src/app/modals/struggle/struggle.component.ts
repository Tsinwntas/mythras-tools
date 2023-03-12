import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component } from '@angular/core';

@Component({
  selector: 'app-struggle',
  templateUrl: './struggle.component.html',
  styleUrls: ['./struggle.component.scss']
})
export class StruggleComponent implements ModalInnerContent {
  getHeader(): string {
    return "Struggle";
  }
  getSources(): string {
    return "Mythras Core Rules 92";
  }
}
