import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dither',
  templateUrl: './dither.component.html',
  styleUrls: ['./dither.component.scss']
})
export class DitherComponent implements ModalInnerContent{
  getHeader(): string {
    return "Dither";
  }

  getSources(): string {
    return "Mythras Core Rules 91";
  }
}
