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

  specializations: { [key: string]: Skill } = {};
  style : CombatStyle;

  canBeSpecialized(skill : Skill) : boolean{
    let specialized = ['Art', 'Craft', 'Language', 'Lore'];
    return specialized.filter(s=>skill.name.startsWith(s)).length != 0;
  }

  getSpecialized(skill : Skill, index?: number) : Skill {
    const key = this.getSpecializationKey(skill, index);
    if (!this.specializations[key]) {
      this.specializations[key] = this.checkSpecialized(skill);
    }
    return this.specializations[key];
  }

  setSpecialized(skill : Skill, key: string) {
    this.specializations[key] = skill;
  }

  getSpecializedProps(currentSkill : Skill, index?: number) {
    const specializationKey = this.getSpecializationKey(currentSkill, index);
    return {
      character:this.character, skill:currentSkill,
      selectSkill : (skill : Skill)=>{this.setSpecialized(skill, specializationKey)}
    }
  }


  checkSpecialized(skill : Skill) : Skill {
    if(!this.character.skills.specialized)
      this.character.skills.specialized = [];

    let specialized  = undefined;
    let specializedArray = this.character.skills.specialized.filter(s => s.name.startsWith(skill.name));
    if(specializedArray.length == 0)
      this.character.skills.specialized.push(specialized = new Skill(skill.name+" (EDIT)", true).setBase(skill.base).setOperations({add:skill.add, multiply: skill.multiply, divide: skill.divide}));
    else{
      const usedSpecialized = Object.values(this.specializations);
      specialized = specializedArray.find(s => !usedSpecialized.includes(s));
      if(!specialized)
        specialized = specializedArray.find(s=>s.cultureBonus);
      if(!specialized)
        specialized = specializedArray[0];
    }
    return specialized;      
  }

  private getSpecializationKey(skill: Skill, index?: number): string {
    return `${skill.name}_${index ?? 0}`;
  }

  getPointsLeft() {
    return 100-(orZero(this.character.skills.combatstyles?.map(style=>orZero(style.cultureBonus)).reduce((a,b)=>a+b,0))
    + orZero(this.character.skills.skills?.map(skill=>orZero(skill.cultureBonus)).reduce((a,b)=>a+b,0))
    + orZero(this.character.skills.specialized?.map(skill=>orZero(skill.cultureBonus)).reduce((a,b)=>a+b,0))
    + orZero(this.character.skills.extraProfessionalCultureSkills?.map(skill=>orZero(skill.cultureBonus)).reduce((a,b)=>a+b,0)));
  }

  setAllStandardsToFive(){
    getStandardCulturalSkills(this.character).forEach(s=>s.cultureBonus=5);
  }

  getStandardCulturalSkills(): Skill[] {
    return getStandardCulturalSkills(this.character);
  }
  
  getProfessionalCulturalSkills(): Skill[] {
    return getProfessionalCulturalSkills(this.character).concat(this.character.skills.extraProfessionalCultureSkills);
  }
  
  getProfessionalProps(){
    return {
      skills : this.character.skills.skills,
      page: 1,
      selectedSkill:(skill : Skill) => {
        this.character.skills.extraProfessionalCultureSkills.push(skill);
      }
    }
  }

  getSkill(skill :Skill) : number {
    return getSkillTotal(this.character, skill);
  }

  resetSkills() {
    this.character.skills.skills.forEach(skill=>skill.cultureBonus=0);
    this.character.skills.combatstyles.forEach(skill=>skill.cultureBonus=0);
    this.character.skills.extraProfessionalCultureSkills.forEach(skill=>skill.cultureBonus=0);
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

