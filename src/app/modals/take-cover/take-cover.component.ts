import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component } from '@angular/core';

@Component({
  selector: 'app-take-cover',
  templateUrl: './take-cover.component.html',
  styleUrls: ['./take-cover.component.scss']
})
export class TakeCoverComponent implements ModalInnerContent {
  getHeader(): string {
    return "Take Cover";
  }

  getSources(): string {
    return "Mythras Firearms Rules 3";
  }
}
