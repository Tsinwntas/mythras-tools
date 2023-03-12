import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component } from '@angular/core';

@Component({
  selector: 'app-possession-exorcism',
  templateUrl: './possession-exorcism.component.html',
  styleUrls: ['./possession-exorcism.component.scss']
})
export class PossessionExorcismComponent implements ModalInnerContent {
  getHeader(): string {
    return "Possession and Exorcism";
  }
  getSources(): string {
    return "Mythras Core Rules 140";
  }
}
