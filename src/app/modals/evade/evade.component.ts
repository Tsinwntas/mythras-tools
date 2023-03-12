import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component } from '@angular/core';

@Component({
  selector: 'app-evade',
  templateUrl: './evade.component.html',
  styleUrls: ['./evade.component.scss']
})
export class EvadeComponent implements ModalInnerContent{
  getHeader(): string {
    return "Evading";
  }

  getSources(): string {
    return "Mythras Core Rules 41,103"; 
  }
}
