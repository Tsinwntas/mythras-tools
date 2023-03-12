import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component } from '@angular/core';

@Component({
  selector: 'app-brace',
  templateUrl: './brace.component.html',
  styleUrls: ['./brace.component.scss']
})
export class BraceComponent implements ModalInnerContent {
  
  getHeader(): string {
    return "Brace";
  }
  getSources?(): string {
    return "Mythras Core Rules 91";
  }

}
