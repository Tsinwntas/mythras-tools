import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component } from '@angular/core';

@Component({
  selector: 'app-drop-weapon',
  templateUrl: './drop-weapon.component.html',
  styleUrls: ['./drop-weapon.component.scss']
})
export class DropWeaponComponent implements ModalInnerContent {
  getHeader(): string {
    return "Drop Weapon";
  }
  getSources(): string {
    return "Mythras Core Rules 93";
  }
}
