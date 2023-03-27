import { Component } from '@angular/core';
import { Spell } from 'src/app/model/spell';
import { folkMagic } from 'src/app/services/magic.service';
import { SpellsComponent } from '../spells/spells.component';

@Component({
  selector: 'app-folk-magic',
  templateUrl: '../spells/spells.component.html',
  styleUrls: ['../spells/spells.component.scss']
})
export class FolkMagicComponent extends SpellsComponent {

  override getHeader(): string {
    return "Folk Magic";
  }

  override getSources() : string {
    return "Mythras Core Rules 123-129";
  }

  override getSpells(): Spell[] {
    return folkMagic;
  }

  override getType(): string {
    return "folk";
  }
}
