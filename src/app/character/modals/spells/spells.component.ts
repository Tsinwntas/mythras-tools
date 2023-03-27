import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Character } from 'src/app/model/character';
import { ModalInnerContent } from 'src/app/model/modal-inner-content';
import { Spell } from 'src/app/model/spell';

@Component({
  selector: 'app-spells',
  templateUrl: './spells.component.html',
  styleUrls: ['./spells.component.scss'],
})
export class SpellsComponent implements ModalInnerContent {
  character: Character;
  search: string;

  constructor(private dialogRef: MatDialogRef<SpellsComponent>) {}

  getHeader() {
    return 'Spells';
  }

  getSources(): string {
    return "Mythras Core Rules";
  }

  setProps(props: any): void {
    this.character = props.character;
  }

  select(spell: Spell) {
    if (!this.getType()) return;
    (this.character.magic as any)[this.getType()].push(spell);
    this.dialogRef.close();
  }

  getType(): string {
    return '';
  }

  getFilteredSpells(): Spell[] {
    if(!this.search)
    {
      return this.getSpells();
    }
    return this.getSpells().filter((spell) => 
      spell.name.toLowerCase().includes(this.search)
      || spell.tags.toLowerCase().includes(this.search)
      || spell.description.toLowerCase().includes(this.search))
  }

  getSpells() : Spell[] {
    return [];
  }
}
