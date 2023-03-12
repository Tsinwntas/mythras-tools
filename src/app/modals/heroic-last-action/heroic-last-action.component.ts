import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component } from '@angular/core';

@Component({
  selector: 'app-heroic-last-action',
  templateUrl: './heroic-last-action.component.html',
  styleUrls: ['./heroic-last-action.component.scss']
})
export class HeroicLastActionComponent implements ModalInnerContent {
  getHeader(): string {
    return "Heroic Last Action";
  }
  getSources(): string {
    return "Mythras Core Rules 111";
  }
}
