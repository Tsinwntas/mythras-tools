import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component } from '@angular/core';

@Component({
  selector: 'app-aiming',
  templateUrl: './aiming.component.html',
  styleUrls: ['./aiming.component.scss']
})
export class AimingComponent implements ModalInnerContent {
  getHeader(): string {
    return "Aiming";
  }

  getSources(): string {
    return "Mythras Core Rules 107";
  }
}
