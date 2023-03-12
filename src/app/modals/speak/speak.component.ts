import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component } from '@angular/core';

@Component({
  selector: 'app-speak',
  templateUrl: './speak.component.html',
  styleUrls: ['./speak.component.scss']
})
export class SpeakComponent implements ModalInnerContent {
  getHeader(): string {
    return "Speak";
  }
  getSources(): string {
    return "Mythras Core Rules 93";
  }
}
