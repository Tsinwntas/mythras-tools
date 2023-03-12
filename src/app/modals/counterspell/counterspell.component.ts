import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component } from '@angular/core';

@Component({
  selector: 'app-counterspell',
  templateUrl: './counterspell.component.html',
  styleUrls: ['./counterspell.component.scss']
})
export class CounterspellComponent implements ModalInnerContent {
  getHeader(): string {
    return "Counter Spell";
  }
  getSources(): string {
    return "Mythras Core Rules 92";
  }
}
