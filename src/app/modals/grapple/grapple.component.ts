import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component } from '@angular/core';

@Component({
  selector: 'app-grapple',
  templateUrl: './grapple.component.html',
  styleUrls: ['./grapple.component.scss']
})
export class GrappleComponent implements ModalInnerContent{
  getHeader(): string {
    return "Grapple";
  }

  getSources(): string {
    return "Mythras Core Rules 106";
  }
}
