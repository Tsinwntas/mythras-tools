import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component } from '@angular/core';

@Component({
  selector: 'app-surprise',
  templateUrl: './surprise.component.html',
  styleUrls: ['./surprise.component.scss']
})
export class SurpriseComponent implements ModalInnerContent {
  getHeader(): string {
    return "Surprise";
  }
  getSources(): string {
    return "Mythras Core Rules 105";
  }
}
