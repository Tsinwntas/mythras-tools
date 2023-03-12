import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component } from '@angular/core';

@Component({
  selector: 'app-knockback',
  templateUrl: './knockback.component.html',
  styleUrls: ['./knockback.component.scss']
})
export class KnockbackComponent implements ModalInnerContent {
  getHeader(): string {
    return "Knockback";
  }
  getSources(): string {
    return "Mythras Core Rules 104"
  }
}
