import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component } from '@angular/core';

@Component({
  selector: 'app-situational-modifiers',
  templateUrl: './situational-modifiers.component.html',
  styleUrls: ['./situational-modifiers.component.scss']
})
export class SituationalModifiersComponent implements ModalInnerContent {
  
  getHeader(): string {
    return "Situational Modifiers";
  }
  getSources(): string {
    return `Mythras Core Rules 50, 77, 79, 85, 88, 96, 101, 106, 108, 222`;
  }

}
