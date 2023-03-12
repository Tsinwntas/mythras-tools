import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component } from '@angular/core';

@Component({
  selector: 'app-ready-weapon',
  templateUrl: './ready-weapon.component.html',
  styleUrls: ['./ready-weapon.component.scss']
})
export class ReadyWeaponComponent implements ModalInnerContent {
  getHeader(): string {
    return "Ready Weapon";
  }

  getSources(): string {
    return "Mythras Core Rules 92";
  }
}
