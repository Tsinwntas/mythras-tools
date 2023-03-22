import { Component, Input } from '@angular/core';
import { Character } from 'src/app/model/character';
import { CombatStyle } from 'src/app/model/combat-style';
import { Skill } from 'src/app/model/skill';
import { getProfessionalCulturalSkills, getSkillTotal, getStandardCulturalSkills } from 'src/app/services/character-service.service';
import { orZero } from 'src/app/services/common.service';

@Component({
  selector: 'app-culture',
  templateUrl: './culture.component.html',
  styleUrls: ['../stats/stats.component.scss','./culture.component.scss']
})
export class CultureComponent {


  @Input() public character: Character;

  art : Skill;
  craft : Skill;
  language: Skill;
  lore : Skill;
  style : CombatStyle;

  canBeSpecialized(skill : Skill) : boolean{
    let specialized = ['Art', 'Craft', 'Language', 'Lore'];
    return specialized.filter(s=>skill.name.startsWith(s)).length != 0;
  }

  getSpecialized(skill : Skill) : Skill {
    let specialized = this.checkSpecialized(skill);
    if(specialized.name.startsWith('Art')){
      this.art = this.art ? this.art : specialized;
      return this.art;
    } if(specialized.name.startsWith('Craft')) {
      this.craft = this.craft? this.craft : specialized;
      return this.craft;
    } if(specialized.name.startsWith('Language')) {
      this.language = this.language ? this.language : specialized;
      return this.language;
    } if(specialized.name.startsWith('Lore')) {
      this.lore = this.lore ? this.lore : specialized;
      return this.lore;
    }
    return specialized;
  }

  setSpecialized(skill : Skill) {
    if(skill.name.startsWith('Art')){
      this.art = skill;
    } if(skill.name.startsWith('Craft')) {
      this.craft = skill;
    } if(skill.name.startsWith('Language')) {
      this.language = skill;
    } if(skill.name.startsWith('Lore')) {
      this.lore = skill;
    }
  }

  getSpecializedProps(currentSkill : Skill) {
    return {
      character:this.character, skill:currentSkill,
      selectSkill : (skill : Skill)=>{this.setSpecialized(skill)}
    }
  }


  checkSpecialized(skill : Skill) : Skill {
    if(!this.character.skills.specialized)
      this.character.skills.specialized = [];

    let specialized  = undefined;
    let specializedArray = this.character.skills.specialized.filter(s => s.name.startsWith(skill.name));
    if(specializedArray.length == 0)
      this.character.skills.specialized.push(specialized = new Skill(skill.name+" (EDIT)", true).setBase(skill.base));
    else{
      specialized = specializedArray.find(s=>s.cultureBonus);
      if(!specialized)
        specialized = specializedArray[0];
    }
    return specialized;      
  }

  getPointsLeft() {
    return 100-(orZero(this.character.skills.combatstyles?.map(style=>orZero(style.cultureBonus)).reduce((a,b)=>a+b,0))
    + orZero(this.character.skills.skills?.map(skill=>orZero(skill.cultureBonus)).reduce((a,b)=>a+b,0))
    + orZero(this.character.skills.specialized?.map(skill=>orZero(skill.cultureBonus)).reduce((a,b)=>a+b,0)));
  }

  getStandardCulturalSkills(): Skill[] {
    return getStandardCulturalSkills(this.character);
  }
  
  getProfessionalCulturalSkills(): Skill[] {
    return getProfessionalCulturalSkills(this.character);
  }

  getSkill(skill :Skill) : number {
    return getSkillTotal(this.character, skill);
  }

  resetSkills() {
    this.character.skills.skills.forEach(skill=>skill.cultureBonus=0);
    this.character.skills.combatstyles.forEach(skill=>skill.cultureBonus=0);
    if(this.character.skills.specialized)
    this.character.skills.specialized.forEach(skill=>skill.cultureBonus=0);
  }

  getCombatStyleProps() : any {
    return {
      character:this.character,
      selectStyle : (style : CombatStyle)=>{
        this.style=this.character.skills.combatstyles.find(s=>s.name==style.name && s.source==style.source)!;
      }
    }
  }

  getCombatStyle() : CombatStyle {
    if(!this.style)
      this.style = this.checkSpecializedStyle();  
    return this.style;
  }


  checkSpecializedStyle() : CombatStyle {
    let specialized  = this.character.skills.combatstyles.find(s => s.cultureBonus);
      return specialized ? specialized : this.character.skills.combatstyles[0];      
  }
}

