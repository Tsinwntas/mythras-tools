import { SpecialEffect } from './../../model/special-effect';
import { SpecialEffectsService } from './../../services/special-effects.service';
import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component } from '@angular/core';

@Component({
  selector: 'app-offensive-special-effects',
  templateUrl: './offensive-special-effects.component.html',
  styleUrls: ['./offensive-special-effects.component.scss']
})
export class OffensiveSpecialEffectsComponent implements ModalInnerContent {

  effects : SpecialEffect[]
  
  constructor(private specials : SpecialEffectsService){
    this.effects = this.specials.getSpecialEffects(true);
  }
  
  getHeader(): string {
    return "Offensive Special Effects";
  }
  getSources(): string {
    return "Mythras Core Rules";
  }

}
