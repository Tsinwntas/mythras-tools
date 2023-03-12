import { ModalInnerContent } from './../../model/modal-inner-content';
import { TableComponent } from 'src/app/table-component/table.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-spirit-combat-special-effects',
  templateUrl: '../../table-component/table.component.html',
  styleUrls: ['./spirit-combat-special-effects.component.scss']
})
export class SpiritCombatSpecialEffectsComponent extends TableComponent implements ModalInnerContent {
  getHeader(): string {
    return "Spirit Combat Special Effects";
  }
  getSources(): string {
    return "Mythras Core Rules 138";
  }
  override getTable(): any[] {
    return [
      {specialEffect:"Bleed Essence", offensive:"X", defensive:"X", specificRoll:"Critical Only", description:"Inflict a psychic wound which leaks 1 Magic Point per cycle, until Spirit Combat ends"},
      {specialEffect:"Compel Bargain", offensive:"X", defensive:"", specificRoll:"", description:"Attacker makes an opposed roll of their Influence against the Defender's Willpower. If successful combat ends and they force the defender to perform a deed"},
      {specialEffect:"Drive Off", offensive:"X", defensive:"", specificRoll:"Mortals Only", description:"Spirit must resist attack roll with Willpower or depart the combat"},
      {specialEffect:"Leech Strength", offensive:"X", defensive:"", specificRoll:"Critical Only", description:"Attacker absorbs the Magic Points inflicted by the attack"},
      {specialEffect:"Obscure", offensive:"", defensive:"X", specificRoll:"Critical Only", description:"Attacker can no longer perceive the defender, unless attacked again"},
      {specialEffect:"Possess", offensive:"X", defensive:"", specificRoll:"Spirits Only", description:"Assuming spirit is capable of possession, the defender must resist its attack roll with their Willpower or become possessed"},
      {specialEffect:"Psychic Stun", offensive:"X", defensive:"X", specificRoll:"", description:"Opponent loses next Turn"},
      {specialEffect:"Restrain", offensive:"X", defensive:"X", specificRoll:"Mortals Only", description:"Prevents the spirit from fleeing or engaging others in Spirit Combat"},
      {specialEffect:"Spirit Lance", offensive:"X", defensive:"", specificRoll:"", description:"Roll Spirit Damage twice and take the best result"},
      {specialEffect:"Sunder Binding", offensive:"X", defensive:"X", specificRoll:"Spirti Fumbles", description:"Breaks the fetish or binding the spirit came from"},
      {specialEffect:"Surpress Ability", offensive:"X", defensive:"X", specificRoll:"Mortals Only", description:"Shuts down one of the spirit's abilities currently in use"},
      {specialEffect:"Turn Back", offensive:"", defensive:"X", specificRoll:"", description:"Attacker suffers its own Spirit Damage roll instead of the defender"},
      {specialEffect:"Withdraw", offensive:"", defensive:"X", specificRoll:"", description:"The defender may automatically disengage from Spirit Combat, returning to their body (if mortal), fetish or the Spirit Plane (if a summoned spirit)"},
    ]
  }
}
