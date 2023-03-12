import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component } from '@angular/core';

@Component({
  selector: 'app-group-luck',
  templateUrl: './group-luck.component.html',
  styleUrls: ['./group-luck.component.scss']
})
export class GroupLuckComponent implements ModalInnerContent {
  getHeader(): string {
    return "Group Luck Points";
  }
  getSources(): string {
    return "Mythras Core Rules 22, 93";
  }
}
