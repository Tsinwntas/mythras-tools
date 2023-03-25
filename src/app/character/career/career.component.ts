import { Component } from '@angular/core';
import { Character } from 'src/app/model/character';
import { CombatStyle } from 'src/app/model/combat-style';
import { Skill } from 'src/app/model/skill';
import { Careers } from 'src/app/services/careers.service';
import {
  getSkillTotal,
  getStandardCulturalSkills,
} from 'src/app/services/character-service.service';
import { orZero } from 'src/app/services/common.service';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: [
    '../stats/stats.component.scss',
    '../culture/culture.component.scss',
    './career.component.scss',
  ],
})
export class CareerComponent {
  character: Character;
  specializations: any = {};

  getCareers(): string[] {
    return Careers.map((c) => c.career);
  }

  getSkill(skill: Skill): number {
    return getSkillTotal(this.character, skill);
  }

  canBeSpecialized(skill: string): boolean {
    return skill.match(/[(].*[)]/) != null;
  }

  getSpecialized(skill: string): Skill {
    let prop = getSpecialization(skill);
    return this.specializations[prop]
      ? this.specializations[prop]
      : this.checkSpecialized(skill);
  }

  checkSpecialized(skill: string): Skill {
    if (!this.character.skills.specialized)
      this.character.skills.specialized = [];

    let specialized = undefined;
    let specializedArray = this.character.skills.specialized.filter((s) =>
      s.name.startsWith(skill.replace(/[ ]*[(][Aa]ny.*[)]/g, ''))
    );
    if (specializedArray.length == 0)
      this.character.skills.specialized.push(
        (specialized = new Skill(skill, true).setBase(this.findSkill(skill).base))
      );
    else {
      specialized = specializedArray.find((s) => s.careerBonus);
      if (!specialized) specialized = specializedArray[0];
    }
    return specialized;
  }

  getSpecializedProps(currentSkill: string) {
    return {
      character: this.character,
      skill: this.findSkill(currentSkill),
      selectSkill: (skill: Skill) => {
        this.specializations[getSpecialization(currentSkill)] = skill;
      },
    };
  }

  getPointsLeft() {
    return (
      100 -
      (orZero(
        this.character.skills.combatstyles
          ?.map((style) => orZero(style.careerBonus))
          .reduce((a, b) => a + b, 0)
      ) +
        orZero(
          this.character.skills.skills
            ?.map((skill) => orZero(skill.careerBonus))
            .reduce((a, b) => a + b, 0)
        ) +
        orZero(
          this.character.skills.specialized
            ?.map((skill) => orZero(skill.careerBonus))
            .reduce((a, b) => a + b, 0)
        ))
    );
  }

  resetSkills() {
    this.character.skills.skills.forEach((skill) => (skill.careerBonus = 0));
    this.character.skills.combatstyles.forEach(
      (skill) => (skill.careerBonus = 0)
    );
    if (this.character.skills.specialized)
      this.character.skills.specialized.forEach(
        (skill) => (skill.careerBonus = 0)
      );
  }

  getCombatStyleProps(): any {
    return {
      character: this.character,
      selectStyle: (style: CombatStyle) => {
        this.specializations['style'] = this.character.skills.combatstyles.find(
          (s) => s.name == style.name && s.source == style.source
        )!;
      },
    };
  }

  getCombatStyle(): CombatStyle {
    if (!this.specializations['style'])
      this.specializations['style'] = this.checkSpecializedStyle();
    return this.specializations['style'];
  }

  checkSpecializedStyle(): CombatStyle {
    let specialized = this.character.skills.combatstyles.find(
      (s) => s.careerBonus
    );
    return specialized ? specialized : this.character.skills.combatstyles[0];
  }

  getStandardCareerSkills(): string[] {
    return this.getCareerSkills('standard');
  }

  getProfessionalCareerSkills(): string[] {
    return this.getCareerSkills('professional');
  }

  getCareerSkills(type: string): string[] {
    if (!this.character.career || !this.character.career.length) return [];
    return (Careers as any).find((c:any)=>c.career==this.character.career)[type];
    // let careers : any = Careers;
    // let career = careers.find((c:any)=>this.character.career==careers[c].career)!;
    // return this.character.skills.skills.filter(s=>career[type].find((n:any)=>n.startsWith(s.name)));
  }

  findSkill(skill : string) : Skill {
    return this.character.skills.skills.find(s=>skill.startsWith(s.name))!;
  }

  isAny(skill : string) : boolean {
    return skill.match(/[ ]*[(][Aa]ny.*[)]/) != null;
  }
}

function getSpecialization(skill: string): string {
  return skill.match(/[(].*[)]/) != null
    ? skill.replace(/[(].*[)].*$/g, '') +
        '_' +
        skill.match(/[(].*[)]/)![0].replace(/[ ]/g, '')
    : skill;
}
