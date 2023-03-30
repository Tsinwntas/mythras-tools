import { invocationMagic, enhancementMagic, sorceryMagic } from './../../services/magic.service';
import { Character } from 'src/app/model/character';
import { Component, OnInit } from '@angular/core';
import { MysticPath } from 'src/app/model/mystic-path';
import { Spell } from 'src/app/model/spell';

@Component({
  selector: 'app-starting-magic',
  templateUrl: './starting-magic.component.html',
  styleUrls: ['./starting-magic.component.scss'],
})
export class StartingMagicComponent implements OnInit {
  character: Character;
  ngOnInit(): void {
    if(!this.character.magic.folk)
    {
      this.character.magic.folk = [];
    }
    if(!this.character.magic.miracles)
    {
      this.character.magic.miracles = [];
    }
    if(!this.character.magic.sorcery)
    {
      this.character.magic.sorcery = [];
    }
    if(!this.character.magic.path)
    {
      this.character.magic.path = new MysticPath();
    }
    if(this.character.mysticalOrder?.name)
      this.character.magic.path.path = this.getPath();
  }

  getPath() {
    return this.character.mysticalOrder.paths.replace(/:.*/g,'').trim();
  }

  getAugmentations() : string[] {
    return this.character.mysticalOrder.paths.match(/Augment[ ][^,]*/g)!.map(a=>a.replace(/Augment[ ]/g,'').trim());
  }

  getInvocations() : string[] {
    return this.character.mysticalOrder.paths.match(/Invoke[ ][^,]*/g)!.map(a=>a.replace(/Invoke[ ]/g,'').trim());
  }

  findInvocation(invocation:string) : Spell {
    return invocationMagic.find(i=>i.name.trim().replace(/[(].*[)]/,"(X)") == invocation)!;
  }

  hasEnhancements() : boolean {
    return this.character.mysticalOrder.paths.includes('Enhance');
  }

  getEnhancements() : string[] {
    return this.character.mysticalOrder.paths.match(/Enhance[ ][^,]*/g)!.map(a=>a.replace(/Enhance[ ]/g,'').trim());
  }

  findEnhancement(enhancement:string) : Spell {
    return enhancementMagic.find(e=>e.name.trim().replace(/[(].*[)]/,"(X)") == enhancement)!;
  }

  getSorceries() : string[] {
    return this.character.sorceryOrder.spells.split(/[ ]*,[ ]*/g);
  }

  findSorcery(sorcery:string) : Spell {
    let s = sorceryMagic.find(s=>s.name.replace(/[(].*[)]/,"").trim() == sorcery.replace(/[(].*[)]/,"").trim())!;
    s.name = sorcery;
    return s;
  }

  getSpellDescription(description : string) : string {
    return description.replace(/[\n]/g,'<br/>').replace(/[\t]/g,"&#9;")
  }


}
