import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component } from '@angular/core';

@Component({
  selector: 'app-augment-modal',
  templateUrl: './augment-modal.component.html',
  styleUrls: ['./augment-modal.component.scss']
})
export class AugmentModalComponent implements ModalInnerContent {

  getHeader(): string {
    return "Augmenting Skills";
  }
  getSources(): string {
    return "Mythras Core Rules 50"
  }

}
