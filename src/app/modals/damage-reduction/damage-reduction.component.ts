import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component } from '@angular/core';

@Component({
  selector: 'app-damage-reduction',
  templateUrl: './damage-reduction.component.html',
  styleUrls: ['./damage-reduction.component.scss']
})
export class DamageReductionComponent implements ModalInnerContent {
  getHeader(): string {
    return "Damage Reduction";
  }

}
