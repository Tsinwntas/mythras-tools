import { SpecialEffect } from './../../model/special-effect';
import { SpecialEffectsService } from './../../services/special-effects.service';
import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component } from '@angular/core';

@Component({
  selector: 'app-special-effects',
  templateUrl: './special-effects.component.html',
  styleUrls: ['./special-effects.component.scss']
})
export class SpecialEffectsComponent implements ModalInnerContent {
  effect : string
  specialEffect : SpecialEffect;

  constructor(private specials : SpecialEffectsService){}

  getHeader(): string {
    return "Special Effects: "+this.effect;
  }
  getSources(): string {
    return "Mythras Core Rules 96-99";
  }

  setProps(props :any): void {
    this.effect = props.effect;
  }

  getSpecialEffect() : SpecialEffect{
    if(!this.specialEffect)
      this.specialEffect = this.specials.getSpecialEffect(this.effect)!;
    return this.specialEffect;
  }
}
