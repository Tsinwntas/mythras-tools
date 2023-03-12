import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component } from '@angular/core';

@Component({
  selector: 'app-assess-situation',
  templateUrl: './assess-situation.component.html',
  styleUrls: ['./assess-situation.component.scss']
})
export class AssessSituationComponent implements ModalInnerContent {
  getHeader(): string {
    return "Assess Situation";
  }
  getSources(): string {
    return "Mythras Core Rules 93";
  }

}
