import { invocationMagic, enhancementMagic, sorceryMagic, theismMagic } from './../../services/magic.service';
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
  expandedFolk:true;
  loading : boolean;
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

  openingFolk(){
    this.expandedFolk=true;
    this.loading=true;
  }

  getFolkCallback() : ()=>void{
    return ()=>{this.loading = false;}
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
    let spellname = invocation;
    if(spellname.includes("Immunity"))
      spellname = "Immunity (X)";
    spellname = spellname.trim().replace(/[(].*[)]/,"(X)");
    let spell = invocationMagic.find(i=>i.name.trim().replace(/[(].*[)]/,"(X)") == spellname)!;
    spell.name = invocation;
    return spell;
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

  getMiracles() : string[] {
    return this.character.theistCult.miracles.split(/[ ]*,[ ]*/g);
  }

  findMiracle(miracle:string) : Spell {
    let s = theismMagic.find(s=>s.name.replace(/[(].*[)]/,"").trim() == miracle.replace(/[(].*[)]/,"").trim())!;
    s.name = miracle;
    return s;
  }

  getSpellDescription(description : string) : string {
    return description.replace(/[\n]/g,'<br/>').replace(/[\t]/g,"&#9;")
  }


}