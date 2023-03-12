import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component } from '@angular/core';

@Component({
  selector: 'app-parry',
  templateUrl: './parry.component.html',
  styleUrls: ['./parry.component.scss']
})
export class ParryComponent implements ModalInnerContent {
  getHeader(): string {
    return "Parry";
  }
  getSources(): string {
    return "Mythras Core Rules 92";
  }
}
