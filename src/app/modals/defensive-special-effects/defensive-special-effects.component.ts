import { OffensiveSpecialEffectsComponent } from './../offensive-special-effects/offensive-special-effects.component';
import { Component } from '@angular/core';
import { SpecialEffectsService } from 'src/app/services/special-effects.service';

@Component({
  selector: 'app-defensive-special-effects',
  templateUrl: '../offensive-special-effects/offensive-special-effects.component.html',
  styleUrls: ['../offensive-special-effects/offensive-special-effects.component.scss']
})
export class DefensiveSpecialEffectsComponent extends OffensiveSpecialEffectsComponent {

  override getHeader(): string {
    return "Defensive Special Effects";
  }  
  
  constructor(private defspecials : SpecialEffectsService){
    super(defspecials);
    this.effects = this.defspecials.getSpecialEffects(false);
  }

}
