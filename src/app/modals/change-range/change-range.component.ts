import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component } from '@angular/core';

@Component({
  selector: 'app-change-range',
  templateUrl: './change-range.component.html',
  styleUrls: ['./change-range.component.scss']
})
export class ChangeRangeComponent implements ModalInnerContent {
  getHeader(): string {
    return "Change Range";
  }
  getSources(): string {
    return "Mythras Core Rules 106, 222";
  }

}
