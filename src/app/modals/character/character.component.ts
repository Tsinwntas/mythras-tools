import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component } from '@angular/core';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements ModalInnerContent {
  getHeader(): string {
    return "Character";
  }
}
